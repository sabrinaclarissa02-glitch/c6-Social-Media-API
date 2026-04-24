const mongoose = require('mongoose');
const commentRepository = require('./comment-repository');

const createComment = async (postId, userId, content) => {
  if (!postId || !userId || !content) throw new Error('postId, userId, and content are required');
  if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid postId or userId');
  if (!content.trim()) throw new Error('Komentar tidak boleh kosong');
  return commentRepository.createComment(postId, userId, content.trim());
};

const deleteComment = async (commentId, userId) => {
  if (!commentId || !userId) throw new Error('commentId and userId are required');
  if (!mongoose.Types.ObjectId.isValid(commentId) || !mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid commentId or userId');
  const result = await commentRepository.deleteComment(commentId, userId);
  if (result.deletedCount === 0) throw new Error('Komentar tidak ditemukan atau akses ditolak');
  return result;
};

const getCommentsByPostId = async (postId) => {
  if (!postId) throw new Error('postId is required');
  if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error('Invalid postId');
  return commentRepository.findCommentsByPostId(postId);
};

module.exports = { createComment, deleteComment, getCommentsByPostId };
