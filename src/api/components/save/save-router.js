const express = require('express');
const router = express.Router();
const saveController = require('./saveController');

router.post('/:postId', authMiddleware, saveController.savePost);
router.delete('/:postId', authMiddleware, saveController.unsavePost);
router.get('/', authMiddleware, saveController.getSavedPosts);

module.exports = router;