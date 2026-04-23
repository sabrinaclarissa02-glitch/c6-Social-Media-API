const repostService = require('./repost-service');

const repostPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await repostService.repostPost(userId, postId);

    res.status(201).json({
      status: "success",
      message: "Post berhasil direpost"
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};

const unrepostPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await repostService.unrepostPost(userId, postId);

    res.status(200).json({
      status: "success",
      message: "Repost berhasil dihapus"
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};

const getRepostCount = async (req, res) => {
  try {
    const { postId } = req.params;

    const repostCount = await repostService.getRepostCount(postId);

    res.status(200).json({
      status: "success",
      data: {
        postId,
        repostCount
      }
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = {
  repostPost,
  unrepostPost,
  getRepostCount
};