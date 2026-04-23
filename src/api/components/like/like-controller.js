const likeService = require('./likeService');

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id; 

    await likeService.likePost(userId, postId);

    res.status(201).json({
      status: "success",
      message: "Post berhasil disukai"
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};


const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await likeService.unlikePost(userId, postId);

    res.status(200).json({
      status: "success",
      message: "Like berhasil dihapus"
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};


const getLikeCount = async (req, res) => {
  try {
    const { postId } = req.params;

    const likeCount = await likeService.getLikeCount(postId);

    res.status(200).json({
      status: "success",
      data: {
        postId,
        likeCount
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
  likePost,
  unlikePost,
  getLikeCount
};