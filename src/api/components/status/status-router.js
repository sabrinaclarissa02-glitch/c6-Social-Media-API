const express = require('express');
const router = express.Router();
const statusController = require('./status-controller');

// Get user status
router.get('/:userId', statusController.getUserStatus);

module.exports = router;