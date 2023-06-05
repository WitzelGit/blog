var express = require('express');
var router = express.Router();
const { setPosts } = require('./data');
//Requirement for reading and writing files
const fs = require('fs');



const readGamesData =() =>{
  try{
      const data = fs.readFileSync('blog.json');
      posts = JSON.parse(data);
  } catch(err){
      console.error('Fehler beim Einlesen der Datei',err);
  }
}

readGamesData();
setPosts(posts);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;