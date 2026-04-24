const Comment = require('../../../models/comment-schema');

const createComment = async (postId, userId, content) => Comment.create({ postId, userId, content });
const deleteComment = async (commentId, userId) => Comment.deleteOne({ _id: commentId, userId });
const findCommentsByPostId = async (postId) =>
  Comment.find({ postId }).populate('userId', 'name username email').sort({ createdAt: -1 });

module.exports = { createComment, deleteComment, findCommentsByPostId };
