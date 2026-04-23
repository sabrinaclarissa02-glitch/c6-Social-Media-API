const commentService = require('./comment-service');

const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;

    const newComment = await commentService.createComment(postId, userId, content);

    res.status(201).json({
      status: 'success',
      message: 'Komentar berhasil ditambahkan',
      data: newComment,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    await commentService.deleteComment(commentId, userId);

    res.status(200).json({
      status: 'success',
      message: 'Komentar berhasil dihapus',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = { createComment, deleteComment };