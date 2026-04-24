const Save = require('../../../models/save-schema');

const findOneSave = async (userId, postId) => Save.findOne({ userId, postId });
const createSave = async (userId, postId) => Save.create({ userId, postId });
const deleteSave = async (userId, postId) => Save.findOneAndDelete({ userId, postId });
const findSavedPosts = async (userId) =>
  Save.find({ userId }).populate({ path: 'postId', populate: { path: 'userId', select: 'name username email' } }).sort({ createdAt: -1 });

module.exports = { findOneSave, createSave, deleteSave, findSavedPosts };
