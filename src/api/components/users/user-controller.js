const userService = require('./userService');

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({
      status: "success",
      message: "User berhasil didaftarkan",
      data: user
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    
    res.status(200).json({
      status: "success",
      token: result.token,
      data: result.user
    });
  } catch (error) {
    res.status(401).json({ status: "fail", message: error.message });
  }
};

module.exports = {
  register,
  login
};