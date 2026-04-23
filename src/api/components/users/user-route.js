const express = require('express');
const userController = require('./user-controller');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/request-login-code', userController.requestLoginCode);
router.post('/login-with-code', userController.loginWithCode);

router.post('/get-all', userController.getAllUsers);
router.post('/get-by-id', userController.getUserById);
router.post('/update-privacy', userController.updatePrivacy);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);

module.exports = router;
