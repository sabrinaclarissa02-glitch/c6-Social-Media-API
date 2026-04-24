const saveRepository = require('./saveRepository');

const savePost = async (userId, postId) => {
  return await saveRepository.createSave(userId, postId);
};

const unsavePost = async (userId, postId) => {
  return await saveRepository.deleteSave(userId, postId);
};

const getSavedPosts = async (userId) => {
  return await saveRepository.findSavedPosts(userId);
};

module.exports = {
  savePost,
  unsavePost,
  getSavedPosts
};