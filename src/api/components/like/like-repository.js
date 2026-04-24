const Like = require('../../../models/like-schema');

const findLike = async (userId, postId) => Like.findOne({ userId, postId });
const createLike = async (userId, postId) => Like.create({ userId, postId });
const deleteLike = async (userId, postId) => Like.deleteOne({ userId, postId });
const countLikes = async (postId) => Like.countDocuments({ postId });

module.exports = { findLike, createLike, deleteLike, countLikes };
