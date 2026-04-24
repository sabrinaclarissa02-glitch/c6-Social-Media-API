const express = require('express');
const followController = require('./follow-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);
router.post('/:followingId/follow', authMiddleware, followController.followUser);
router.post('/:followingId/unfollow', authMiddleware, followController.unfollowUser);

module.exports = router;
