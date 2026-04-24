const express = require('express');

const userRoute = require('./components/users/user-route');
const postRoute = require('./components/post/post-route');
const saveRoute = require('./components/save/save-route');
const likeRoute = require('./components/like/like-router');
const repostRoute = require('./components/repost/repost-router');
const commentRoute = require('./components/comment/comment-router');
const followRoute = require('./components/follow/follow-router');
const dmRoute = require('./components/dm/dm-route');
const settingsRoute = require('./components/settings/settings-route');
const statusRoute = require('./components/status/status-router');
const exploreRoute = require('./components/explore/explore-router');

const router = express.Router();

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/save', saveRoute);
router.use('/likes', likeRoute);
router.use('/reposts', repostRoute);
router.use('/comments', commentRoute);
router.use('/follow', followRoute);
router.use('/dm', dmRoute);
router.use('/settings', settingsRoute);
router.use('/status', statusRoute);
router.use('/explore', exploreRoute);

module.exports = router;
