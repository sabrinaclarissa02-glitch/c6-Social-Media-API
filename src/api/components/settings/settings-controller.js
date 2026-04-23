const settingsService = require('./settings-service');

const getSettings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await settingsService.getSettings(userId);

    res.status(200).json({
      status: 'success',
      message: 'Settings fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const {
      userId,
      isPrivateAccount,
      allowDmFrom,
      showOnlineStatus,
      notificationMessage,
      notificationFollow,
      notificationLike,
      theme,
      language,
    } = req.body;

    const data = await settingsService.updateSettings(userId, {
      isPrivateAccount,
      allowDmFrom,
      showOnlineStatus,
      notificationMessage,
      notificationFollow,
      notificationLike,
      theme,
      language,
    });

    res.status(200).json({
      status: 'success',
      message: 'Settings updated successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const { userId, blockedUserId } = req.body;
    const data = await settingsService.blockUser(userId, blockedUserId);

    res.status(200).json({
      status: 'success',
      message: 'User blocked successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const unblockUser = async (req, res, next) => {
  try {
    const { userId, blockedUserId } = req.body;
    const data = await settingsService.unblockUser(userId, blockedUserId);

    res.status(200).json({
      status: 'success',
      message: 'User unblocked successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
  blockUser,
  unblockUser,
};