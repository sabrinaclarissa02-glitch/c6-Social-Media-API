const exploreService = require('./explore-service');

const getExplorePosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await exploreService.getExplorePosts(userId);

    res.status(200).json({
      status: 'success',
      data: posts,
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = {
  getExplorePosts,
};
