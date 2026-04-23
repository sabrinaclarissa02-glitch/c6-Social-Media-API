const Like = require('../models/Like');

const findLike = async (userId, postId) => {
  return await Like.findOne({ userId, postId });
};

const createLike = async (userId, postId) => {
  return await Like.create({ userId, postId });
};

const deleteLike = async (userId, postId) => {
  return await Like.deleteOne({ userId, postId });
};

const countLikes = async (postId) => {
  return await Like.countDocuments({ postId });
};

module.exports = {
  findLike,
  createLike,
  deleteLike,
  countLikes
};