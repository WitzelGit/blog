var posts = [];

module.exports = {
  getPosts: () => posts,
  setPosts: (newPosts) => {
    posts = newPosts;
  },
};