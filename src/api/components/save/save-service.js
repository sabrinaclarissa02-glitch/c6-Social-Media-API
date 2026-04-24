const mongoose = require('mongoose');
const saveRepository = require('./save-repository');

const savePost = async (userId, postId) => {
  if (!userId || !postId) throw new Error('userId and postId are required');
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) throw new Error('Invalid userId or postId');
  const existingSave = await saveRepository.findOneSave(userId, postId);
  if (existingSave) throw new Error('Post already saved');
  return saveRepository.createSave(userId, postId);
};

const unsavePost = async (userId, postId) => {
  if (!userId || !postId) throw new Error('userId and postId are required');
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) throw new Error('Invalid userId or postId');
  const existingSave = await saveRepository.findOneSave(userId, postId);
  if (!existingSave) throw new Error('Saved post not found');
  return saveRepository.deleteSave(userId, postId);
};

const getSavedPosts = async (userId) => {
  if (!userId) throw new Error('userId is required');
  if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId');
  return saveRepository.findSavedPosts(userId);
};

module.exports = { savePost, unsavePost, getSavedPosts };
