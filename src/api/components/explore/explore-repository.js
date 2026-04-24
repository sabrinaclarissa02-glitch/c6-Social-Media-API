const db = require('../config/database'); // sesuaikan

const findExplorePosts = async (userId) => {
  const query = `
    SELECT p.*
    FROM posts p
    WHERE p.user_id NOT IN (
      SELECT following_id FROM follows WHERE follower_id = ?
    )
    ORDER BY p.created_at DESC
    LIMIT 20
  `;

  const [rows] = await db.execute(query, [userId]);
  return rows;
};

module.exports = {
  findExplorePosts
};