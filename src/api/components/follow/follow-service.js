const followRepository = require('./follow-repository');

const followUser = async (followerId, followingId) => {
  if (followerId === followingId) {
    const error = new Error('Tidak bisa mem-follow diri sendiri');
    error.statusCode = 400;
    throw error;
  }
  try {
    return await followRepository.createFollow(followerId, followingId);
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error('User sudah di-follow');
      error.statusCode = 400;
      throw error;
    }
    throw err;
  }
};

const unfollowUser = async (followerId, followingId) => {
  const result = await followRepository.deleteFollow(followerId, followingId);
  if (result.deletedCount === 0) {
    const error = new Error('Data follow tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
  return result;
};

module.exports = { followUser, unfollowUser };