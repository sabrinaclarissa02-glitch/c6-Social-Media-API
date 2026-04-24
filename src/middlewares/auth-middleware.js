const jwt = require('jsonwebtoken');
const config = require('../core/config');

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
