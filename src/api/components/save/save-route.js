const express = require('express');
const saveController = require('./save-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.get('/', authMiddleware, saveController.getSavedPosts);
router.post('/:postId', authMiddleware, saveController.savePost);
router.post('/unsave/:postId', authMiddleware, saveController.unsavePost);

module.exports = router;
