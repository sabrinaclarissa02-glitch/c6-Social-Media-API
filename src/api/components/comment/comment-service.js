const commentRepository = require('./comment-repository');

const createComment = async (postId, userId, content) => {
  if (!content || content.trim() === '') {
    const error = new Error('Komentar tidak boleh kosong');
    error.statusCode = 400;
    throw error;
  }
  return await commentRepository.createComment(postId, userId, content);
};

const deleteComment = async (commentId, userId) => {
  const result = await commentRepository.deleteComment(commentId, userId);
  if (result.deletedCount === 0) {
    const error = new Error('Komentar tidak ditemukan atau akses ditolak');
    error.statusCode = 404;
    throw error;
  }
  return result;
};

module.exports = { createComment, deleteComment };