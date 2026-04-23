const express = require('express');
const postController = require('./post-controller');

const router = express.Router();

router.post('/create', postController.createPost);
router.post('/update', postController.updatePost);
router.post('/delete', postController.deletePost);

module.exports = router;
