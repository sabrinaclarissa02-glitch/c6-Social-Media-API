const mongoose = require('mongoose');
const statusRepository = require('./status-repository');

const getUserStatus = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId');
  return statusRepository.getUserStats(userId);
};

const createStatus = async ({ userId, content, mediaUrl }) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId');
  if (!content && !mediaUrl) throw new Error('content or mediaUrl is required');
  return statusRepository.createStatus({ userId, content, mediaUrl });
};

const getActiveStatusesByUser = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid userId');
  return statusRepository.findActiveStatusesByUser(userId);
};

const getActiveStatuses = async () => statusRepository.findActiveStatuses();

module.exports = { getUserStatus, createStatus, getActiveStatusesByUser, getActiveStatuses };
