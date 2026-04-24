const Settings = require('../../../models/settings-schema');
const { errorTypes, errorResponder } = require('../../../core/errors');

const userProjection = 'name username email';

const getByUserId = async (userId) => {
  try {
    return await Settings.findOne({ userId }).populate('blockedUsers', userProjection);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const createDefault = async (userId) => {
  try {
    return await Settings.create({ userId, blockedUsers: [] });
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const updateSettings = async (userId, payload) => {
  try {
    return await Settings.findOneAndUpdate(
      { userId },
      payload,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate('blockedUsers', userProjection);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const addBlockedUser = async (userId, blockedUserId) => {
  try {
    return await Settings.findOneAndUpdate(
      { userId },
      { $addToSet: { blockedUsers: blockedUserId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate('blockedUsers', userProjection);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const removeBlockedUser = async (userId, blockedUserId) => {
  try {
    return await Settings.findOneAndUpdate(
      { userId },
      { $pull: { blockedUsers: blockedUserId } },
      { new: true }
    ).populate('blockedUsers', userProjection);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

module.exports = {
  getByUserId,
  createDefault,
  updateSettings,
  addBlockedUser,
  removeBlockedUser,
};
