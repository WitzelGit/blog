var express = require('express');
var router = express.Router();
const { getPosts } = require('./data');
const { setPosts } = require('./data');
const fs = require('fs');
const fsPromises = require('fs').promises;


var posts = getPosts();

//ID
const {randomUUID} = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
    readPost();
    posts = getPosts();
    console.log(posts);
    res.send(posts);
});


async function readPost() {
    try {
      const existingData = fs.readFileSync('blog.json'); // Lese vorhandene Daten aus der Datei
      const posts= JSON.parse(existingData); // Konvertiere die Daten in ein JavaScript-Objekt
      console.log(posts);
      setPosts(posts);
    } catch (err) {
      console.error('Fehler beim Einlesen der Datei', err);
    }
  }

async function writePost(data) {
    try {
      const existingData = await fsPromises.readFile('blog.json'); // Lese vorhandene Daten aus der Datei
      const posts = JSON.parse(existingData); 
      
      posts.push(data); 
  
      await fsPromises.writeFile('blog.json', JSON.stringify(posts, null, 2)); // Schreibe die aktualisierten Daten in die Datei
  
      console.log('Post erfolgreich hinzugefügt!');
    } catch (err) {
      console.error('Fehler beim Schreiben der Datei', err);
    }
  }


  router.post('/', function(req, res, next) { 
    try {
      if (!req.files.file) {
        res.send({
          status: false,
          message: 'Keine Datei erhalten'
        });
      } else {
        
       
        let file = req.files.file;
        const fileName = file.name;
        const id = randomUUID();
        const postData = {
          ...req.body,
          imageName: fileName,
          id: id
        };
        console.log(postData);
    
        writePost(postData);
        file.mv('uploads/' + file.name, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          res.render('index', {title: 'Success und Freude'})   
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });



router.post('/', function (req, res, next) {
    res.send("HI");
    posts.push(req.body);
    setPosts(posts);
    console.log(posts);

});
router.get('/newPost', function (req, res, next) {
    res.render('blogpost', {title:'Neuer Blogeintrag'});
});

router.route('/:postID').get((req,res)=>{
  
    var post = [];
    console.log(posts);
    for(var i=0; i<posts.length; i++) {
      if(req.params.postID === posts[i].id) {
          post = posts[i];
      }
    }

      res.send(post);
    
})
    




module.exports = router;
