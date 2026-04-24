const express = require('express');
const statusController = require('./status-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.get('/', statusController.getActiveStatuses);
router.get('/:userId', statusController.getUserStatus);
router.get('/:userId/active', statusController.getActiveStatusesByUser);
router.post('/create', authMiddleware, statusController.createStatus);

module.exports = router;
