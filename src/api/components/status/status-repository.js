const Post = require('../../../models/post-schema');
const Follow = require('../../../models/follow-schema');
const Status = require('../../../models/status-schema');

const getUserStats = async (userId) => {
  const [totalPosts, totalFollowers, totalFollowing] = await Promise.all([
    Post.countDocuments({ userId }),
    Follow.countDocuments({ followingId: userId }),
    Follow.countDocuments({ followerId: userId }),
  ]);
  return { totalPosts, totalFollowers, totalFollowing };
};

const createStatus = async (payload) => Status.create(payload);
const findActiveStatusesByUser = async (userId) =>
  Status.find({ userId, expiresAt: { $gt: new Date() } }).populate('userId', 'name username email').sort({ createdAt: -1 });
const findActiveStatuses = async () =>
  Status.find({ expiresAt: { $gt: new Date() } }).populate('userId', 'name username email').sort({ createdAt: -1 });

module.exports = { getUserStats, createStatus, findActiveStatusesByUser, findActiveStatuses };
