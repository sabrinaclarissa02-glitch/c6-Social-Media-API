const express = require('express');
const exploreController = require('./explore-controller');

const router = express.Router();

router.get('/', exploreController.getExplorePosts);

module.exports = router;
