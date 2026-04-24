const loginService = require('./loginService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService.login(email, password);

    res.status(200).json({
      status: "success",
      token: result.token,
      data: result.user
    });

  } catch (error) {
    res.status(error.statusCode || 401).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = { login };