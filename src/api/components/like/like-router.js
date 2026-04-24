const express = require('express');
const likeController = require('./like-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.post('/:postId/like', authMiddleware, likeController.likePost);
router.post('/:postId/unlike', authMiddleware, likeController.unlikePost);
router.get('/:postId/likes', likeController.getLikeCount);

module.exports = router;
