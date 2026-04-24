const statusService = require('./status-service');

const getUserStatus = async (req, res, next) => { try {
  const data = await statusService.getUserStatus(req.params.userId);
  res.status(200).json({ success: true, data });
} catch (error) { next(error); } };

const createStatus = async (req, res, next) => { try {
  const userId = req.user?.id || req.body.userId;
  const data = await statusService.createStatus({ userId, content: req.body.content, mediaUrl: req.body.mediaUrl });
  res.status(201).json({ success: true, message: 'Status created successfully', data });
} catch (error) { next(error); } };

const getActiveStatusesByUser = async (req, res, next) => { try {
  const data = await statusService.getActiveStatusesByUser(req.params.userId);
  res.status(200).json({ success: true, data });
} catch (error) { next(error); } };

const getActiveStatuses = async (req, res, next) => { try {
  const data = await statusService.getActiveStatuses();
  res.status(200).json({ success: true, data });
} catch (error) { next(error); } };

module.exports = { getUserStatus, createStatus, getActiveStatusesByUser, getActiveStatuses };
