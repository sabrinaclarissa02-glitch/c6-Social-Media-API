const likeRepository = require('./likeRepository');

const likePost = async (userId, postId) => {
  try {
    return await likeRepository.createLike(userId, postId);
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error("Post sudah di-like");
      error.statusCode = 400;
      throw error;
    }
    throw err;
  }
};

const unlikePost = async (userId, postId) => {
  const result = await likeRepository.deleteLike(userId, postId);

  if (result.deletedCount === 0) {
    const error = new Error("Like tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return result;
};

const getLikeCount = async (postId) => {
  return await likeRepository.countLikes(postId);
};

module.exports = {
  likePost,
  unlikePost,
  getLikeCount
};