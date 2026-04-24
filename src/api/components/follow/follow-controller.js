const followService = require('./follow-service');

const followUser = async (req, res, next) => { try {
  const followerId = req.user?.id || req.body.followerId;
  await followService.followUser(followerId, req.params.followingId);
  res.status(201).json({ success: true, message: 'Berhasil mem-follow user' });
} catch (error) { next(error); } };

const unfollowUser = async (req, res, next) => { try {
  const followerId = req.user?.id || req.body.followerId;
  await followService.unfollowUser(followerId, req.params.followingId);
  res.status(200).json({ success: true, message: 'Berhasil unfollow user' });
} catch (error) { next(error); } };

const getFollowers = async (req, res, next) => { try {
  const data = await followService.getFollowers(req.params.userId);
  res.status(200).json({ success: true, data });
} catch (error) { next(error); } };

const getFollowing = async (req, res, next) => { try {
  const data = await followService.getFollowing(req.params.userId);
  res.status(200).json({ success: true, data });
} catch (error) { next(error); } };

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
