const userService = require('./user-service');

const register = async (req, res) => {
  try {
    const result = await userService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'Register success',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login success',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const requestLoginCode = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await userService.requestLoginCode(email);

    res.status(200).json({
      success: true,
      message: 'Login code generated successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginWithCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await userService.loginWithCode({ email, code });

    res.status(200).json({
      success: true,
      message: 'Login with code success',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: 'Get all users success',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await userService.getUserById(id);

    res.status(200).json({
      success: true,
      message: 'Get user success',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePrivacy = async (req, res) => {
  try {
    const result = await userService.updatePrivacy(req.body);

    res.status(200).json({
      success: true,
      message: 'Privacy updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Update user success',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await userService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
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
