const express = require('express');
const users = require('./components/users/user-route');
const likes = require('./components/like/like-router');
const follows = require('./components/follow/follow-router');
const comments = require('./components/comment/comment-router');
const dm = require('./components/dm/dm-route');
const settings = require('./components/settings/settings-route');

module.exports = () => {
  const app = express.Router();

  app.use('/users', users);
  app.use('/likes', likes);
  app.use('/follows', follows);
  app.use('/comments', comments);
  app.use('/dm', dm);
  app.use('/settings', settings);

  return app;
};