const db = require('../config/database'); // adjust path if needed

const findByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = ?
    LIMIT 1
  `;

  const [rows] = await db.query(query, [email]);
  return rows[0];
};

module.exports = { findByEmail };