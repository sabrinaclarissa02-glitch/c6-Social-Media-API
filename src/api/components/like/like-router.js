const express = require('express');
const router = express.Router();
const likeController = require('./likeController');

// Like post
router.post('/:postId/like', likeController.likePost);

// Unlike post
router.delete('/:postId/unlike', likeController.unlikePost);

// Get jumlah like
router.get('/:postId/likes', likeController.getLikeCount);

module.exports = router;