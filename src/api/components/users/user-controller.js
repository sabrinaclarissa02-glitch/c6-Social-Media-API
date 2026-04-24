const userService = require('./user-service');

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({ success: true, message: 'Register success', data: result });
  } catch (error) { next(error); }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({ success: true, message: 'Login success', data: result });
  } catch (error) { next(error); }
};

const requestLoginCode = async (req, res, next) => {
  try {
    const result = await userService.requestLoginCode(req.body.email);
    res.status(200).json({ success: true, message: 'Login code generated successfully', data: result });
  } catch (error) { next(error); }
};

const loginWithCode = async (req, res, next) => {
  try {
    const result = await userService.loginWithCode(req.body);
    res.status(200).json({ success: true, message: 'Login with code success', data: result });
  } catch (error) { next(error); }
};

const getAllUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({ success: true, message: 'Get all users success', data: result });
  } catch (error) { next(error); }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.id;
    const result = await userService.getUserById(id);
    res.status(200).json({ success: true, message: 'Get user success', data: result });
  } catch (error) { next(error); }
};

const updatePrivacy = async (req, res, next) => {
  try {
    const id = req.user?.id || req.body.id || req.params.id;
    const result = await userService.updatePrivacy({ id, isPrivate: req.body.isPrivate });
    res.status(200).json({ success: true, message: 'Privacy updated successfully', data: result });
  } catch (error) { next(error); }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.user?.id || req.body.id || req.params.id;
    const result = await userService.updateUser({ id, ...req.body });
    res.status(200).json({ success: true, message: 'Update user success', data: result });
  } catch (error) { next(error); }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.user?.id || req.body.id || req.params.id;
    const result = await userService.deleteUser(id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) { next(error); }
};

module.exports = {
  register,
  login,
  requestLoginCode,
  loginWithCode,
  getAllUsers,
  getUserById,
  updatePrivacy,
  updateUser,
  deleteUser,
};
