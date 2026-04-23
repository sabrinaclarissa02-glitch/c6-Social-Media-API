const postService = require('./post-service');

const createPost = async (req, res) => {
  try {
    const result = await postService.createPost(req.body);

    res.status(201).json({
      success: true,
      message: 'Create post success',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const result = await postService.updatePost(req.body);

    res.status(200).json({
      success: true,
      message: 'Update post success',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await postService.deletePost(id);

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
  createPost,
  updatePost,
  deletePost,
};
