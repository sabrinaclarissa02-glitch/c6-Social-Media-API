const express = require('express');
const postController = require('./post-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/user/:userId', postController.getPostsByUserId);
router.get('/:id', postController.getPostById);
router.post('/create', authMiddleware, postController.createPost);
router.post('/update', authMiddleware, postController.updatePost);
router.post('/delete', authMiddleware, postController.deletePost);
router.post('/:id/delete', authMiddleware, postController.deletePost);

module.exports = router;
