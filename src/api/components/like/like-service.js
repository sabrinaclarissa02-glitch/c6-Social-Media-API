const mongoose = require('mongoose');
const likeRepository = require('./like-repository');

const validateIds = (userId, postId) => {
  if (!userId || !postId) throw new Error('userId and postId are required');
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) throw new Error('Invalid userId or postId');
};

const likePost = async (userId, postId) => {
  validateIds(userId, postId);
  const existing = await likeRepository.findLike(userId, postId);
  if (existing) throw new Error('Post sudah di-like');
  return likeRepository.createLike(userId, postId);
};

const unlikePost = async (userId, postId) => {
  validateIds(userId, postId);
  const result = await likeRepository.deleteLike(userId, postId);
  if (result.deletedCount === 0) throw new Error('Like tidak ditemukan');
  return result;
};

const getLikeCount = async (postId) => {
  if (!postId) throw new Error('postId is required');
  if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error('Invalid postId');
  return likeRepository.countLikes(postId);
};

module.exports = { likePost, unlikePost, getLikeCount };
