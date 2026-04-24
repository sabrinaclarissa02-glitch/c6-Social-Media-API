const mongoose = require('mongoose');
const followRepository = require('./follow-repository');

const validateIds = (followerId, followingId) => {
  if (!followerId || !followingId) throw new Error('followerId and followingId are required');
  if (!mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followingId)) throw new Error('Invalid followerId or followingId');
  if (String(followerId) === String(followingId)) throw new Error('Tidak bisa mem-follow diri sendiri');
};

const followUser = async (followerId, followingId) => {
  validateIds(followerId, followingId);
  try { return await followRepository.createFollow(followerId, followingId); }
  catch (err) { if (err.code === 11000) throw new Error('User sudah di-follow'); throw err; }
};

const unfollowUser = async (followerId, followingId) => {
  validateIds(followerId, followingId);
  const result = await followRepository.deleteFollow(followerId, followingId);
  if (result.deletedCount === 0) throw new Error('Data follow tidak ditemukan');
  return result;
};

const getFollowers = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId');
  return followRepository.findFollowers(userId);
};

const getFollowing = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId');
  return followRepository.findFollowing(userId);
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
