const express = require('express');
const commentController = require('./comment-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', authMiddleware, commentController.createComment);
router.post('/comments/:commentId/delete', authMiddleware, commentController.deleteComment);

module.exports = router;
