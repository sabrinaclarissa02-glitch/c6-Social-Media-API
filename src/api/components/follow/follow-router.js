const express = require('express');
const router = express.Router();
const followController = require('./follow-controller');

router.post('/:followingId/follow', followController.followUser);
router.delete('/:followingId/unfollow', followController.unfollowUser);

module.exports = router;