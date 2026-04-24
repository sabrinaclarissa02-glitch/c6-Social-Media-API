const db = require('../config/database'); // sesuaikan

const getUserStats = async (userId) => {
  const [posts] = await db.execute(
    `SELECT COUNT(*) as totalPosts FROM posts WHERE user_id = ?`,
    [userId]
  );

  const [followers] = await db.execute(
    `SELECT COUNT(*) as totalFollowers FROM follows WHERE following_id = ?`,
    [userId]
  );

  const [following] = await db.execute(
    `SELECT COUNT(*) as totalFollowing FROM follows WHERE follower_id = ?`,
    [userId]
  );

  return {
    totalPosts: posts[0].totalPosts,
    totalFollowers: followers[0].totalFollowers,
    totalFollowing: following[0].totalFollowing
  };
};

module.exports = {
  getUserStats,
};