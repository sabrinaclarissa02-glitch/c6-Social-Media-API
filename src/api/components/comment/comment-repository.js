const Comment = require('../../../models/comment-schema');

const createComment = async (postId, userId, content) => Comment.create({ postId, userId, content });

const deleteComment = async (commentId, userId) => Comment.deleteOne({ _id: commentId, userId });

module.exports = { createComment, deleteComment };
