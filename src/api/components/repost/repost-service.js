const mongoose = require('mongoose');
const repostRepository = require('./repost-repository');

const validateIds = (userId, postId) => {
  if (!userId || !postId) throw new Error('userId and postId are required');
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) throw new Error('Invalid userId or postId');
};

const repostPost = async (userId, postId) => {
  validateIds(userId, postId);
  const existing = await repostRepository.findRepost(userId, postId);
  if (existing) throw new Error('Anda sudah merepost postingan ini');
  return repostRepository.createRepost(userId, postId);
};

const unrepostPost = async (userId, postId) => {
  validateIds(userId, postId);
  const result = await repostRepository.deleteRepost(userId, postId);
  if (result.deletedCount === 0) throw new Error('Repost tidak ditemukan');
  return result;
};

const getRepostCount = async (postId) => {
  if (!postId) throw new Error('postId is required');
  if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error('Invalid postId');
  return repostRepository.countReposts(postId);
};

module.exports = { repostPost, unrepostPost, getRepostCount };
