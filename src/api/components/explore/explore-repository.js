const Post = require('../../../models/post-schema');

const findExplorePosts = async () =>
  Post.find().populate('userId', 'name username email').populate('mentions', 'name username email').sort({ createdAt: -1 }).limit(20);

module.exports = { findExplorePosts };
