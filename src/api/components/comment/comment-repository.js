const { Comments } = require('../../../models');

const createComment = async (postId, userId, content) => {
  return await Comments.create({ postId, userId, content });
};

const deleteComment = async (commentId, userId) => {
  return await Comments.deleteOne({ _id: commentId, userId });
};

module.exports = { createComment, deleteComment };