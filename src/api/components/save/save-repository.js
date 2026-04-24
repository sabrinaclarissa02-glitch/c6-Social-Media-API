const db = require('../config/database');

const createSave = async (userId, postId) => {
  const query = `
    INSERT INTO saves (user_id, post_id)
    VALUES (?, ?)
  `;
  return db.query(query, [userId, postId]);
};

const deleteSave = async (userId, postId) => {
  const query = `
    DELETE FROM saves
    WHERE user_id = ? AND post_id = ?
  `;
  return db.query(query, [userId, postId]);
};

const findSavedPosts = async (userId) => {
  const query = `
    SELECT * FROM saves
    WHERE user_id = ?
  `;
  return db.query(query, [userId]);
};

module.exports = {
  createSave,
  deleteSave,
  findSavedPosts
};