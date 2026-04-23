const express = require('express');
const router = express.Router();
const repostController = require('./repostController');

router.post('/:postId/repost', repostController.repostPost);

router.delete('/:postId/repost', repostController.unrepostPost);

router.get('/:postId/reposts', repostController.getRepostCount);

module.exports = router;