const statusService = require('./status-service');

const getUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const status = await statusService.getUserStatus(userId);

    res.status(200).json({
      status: "success",
      data: status
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = {
  getUserStatus
};