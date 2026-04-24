const express = require('express');
const router = express.Router();
const exploreController = require('./explore-controller');

// Get explore posts
router.get('/', exploreController.getExplorePosts);

module.exports = router;