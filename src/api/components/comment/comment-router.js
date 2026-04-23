const express = require('express');
const router = express.Router();
const commentController = require('./comment-controller');

router.post('/:postId/comments', commentController.createComment);
router.delete('/comments/:commentId', commentController.deleteComment);

module.exports = router;