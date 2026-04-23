const mongoose = require('mongoose');
const settingsRepository = require('./settings-repository');
const { errorTypes, errorResponder } = require('../../../core/errors');

const getSettings = async (userId) => {
  if (!userId) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'userId is required');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid userId');
  }

  let settings = await settingsRepository.getByUserId(userId);

  if (!settings) {
    settings = await settingsRepository.createDefault(userId);
  }

  return settings;
};

const updateSettings = async (userId, payload) => {
  if (!userId) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'userId is required');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid userId');
  }

  const filteredPayload = {};

  if (payload.isPrivateAccount !== undefined) {
    filteredPayload.isPrivateAccount = payload.isPrivateAccount;
  }

  if (payload.allowDmFrom !== undefined) {
    const allowedValues = ['everyone', 'followers', 'none'];

    if (!allowedValues.includes(payload.allowDmFrom)) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'allowDmFrom must be one of: everyone, followers, none'
      );
    }

    filteredPayload.allowDmFrom = payload.allowDmFrom;
  }

  if (payload.showOnlineStatus !== undefined) {
    filteredPayload.showOnlineStatus = payload.showOnlineStatus;
  }

  if (payload.notificationMessage !== undefined) {
    filteredPayload.notificationMessage = payload.notificationMessage;
  }

  if (payload.notificationFollow !== undefined) {
    filteredPayload.notificationFollow = payload.notificationFollow;
  }

  if (payload.notificationLike !== undefined) {
    filteredPayload.notificationLike = payload.notificationLike;
  }

  if (payload.theme !== undefined) {
    const allowedThemes = ['light', 'dark'];

    if (!allowedThemes.includes(payload.theme)) {
      throw errorResponder(
        errorTypes.VALIDATION,
        'theme must be one of: light, dark'
      );
    }

    filteredPayload.theme = payload.theme;
  }

  if (payload.language !== undefined) {
    filteredPayload.language = payload.language;
  }

  return await settingsRepository.updateSettings(userId, filteredPayload);
};

const blockUser = async (userId, blockedUserId) => {
  if (!userId || !blockedUserId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'userId and blockedUserId are required'
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(blockedUserId)
  ) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid userId or blockedUserId');
  }

  if (String(userId) === String(blockedUserId)) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'You cannot block yourself');
  }

  return await settingsRepository.addBlockedUser(userId, blockedUserId);
};

const unblockUser = async (userId, blockedUserId) => {
  if (!userId || !blockedUserId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'userId and blockedUserId are required'
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(blockedUserId)
  ) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid userId or blockedUserId');
  }

  return await settingsRepository.removeBlockedUser(userId, blockedUserId);
};

module.exports = {
  getSettings,
  updateSettings,
  blockUser,
  unblockUser,
};