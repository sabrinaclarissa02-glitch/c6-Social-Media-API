const express = require('express');
const router = express.Router();
const settingsController = require('./settings-controller');

router.get('/:userId', settingsController.getSettings);
router.post('/update', settingsController.updateSettings);
router.post('/block', settingsController.blockUser);
router.post('/unblock', settingsController.unblockUser);

module.exports = router;