const express = require('express');
const users = require('./components/users/user-route');
const likes = require('./components/like/like-router');
const follows = require('./components/follow/follow-router');
const comments = require('./components/comment/comment-router');

module.exports = () => {
  const app = express.Router();

  app.use('/users', users);
  app.use('/likes', likes);
  app.use('/follows', follows);
  app.use('/comments', comments);

  return app;
};