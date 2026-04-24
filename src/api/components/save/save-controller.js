const saveService = require('./saveService');

const savePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await saveService.savePost(userId, postId);

    res.status(201).json({
      status: "success",
      message: "Post berhasil disimpan"
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};

const unsavePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    await saveService.unsavePost(userId, postId);

    res.status(200).json({
      status: "success",
      message: "Post berhasil dihapus dari simpanan"
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};

const getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedPosts = await saveService.getSavedPosts(userId);

    res.status(200).json({
      status: "success",
      data: savedPosts
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "fail",
      message: error.message
    });
  }
};

module.exports = {
  savePost,
  unsavePost,
  getSavedPosts
};