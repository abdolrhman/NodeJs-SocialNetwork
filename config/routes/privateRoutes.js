const privateRoutes = {
  // Profile
  'GET /users': 'UserController.getAll',
  'GET /myPosts': 'UserController.userOwnPosts',
  'GET /posts/:username': 'UserController.userPosts',
  'GET /:username': 'UserController.userProfile',
  // Posts
  'POST /post': 'PostController.create',
  'POST /post/ByHashtags': 'PostController.getPostsByHashtag',
  'GET /posts': 'PostController.mostRecentPosts',

};

module.exports = privateRoutes;
