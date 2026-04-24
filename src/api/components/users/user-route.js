const express = require('express');
const userController = require('./user-controller');
const authMiddleware = require('../../../middlewares/auth-middleware');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/request-login-code', userController.requestLoginCode);
router.post('/login-with-code', userController.loginWithCode);
router.get('/', userController.getAllUsers);
router.post('/get-all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/get-by-id', userController.getUserById);
router.post('/update-privacy', authMiddleware, userController.updatePrivacy);
router.post('/update', authMiddleware, userController.updateUser);
router.post('/delete', authMiddleware, userController.deleteUser);

module.exports = router;
