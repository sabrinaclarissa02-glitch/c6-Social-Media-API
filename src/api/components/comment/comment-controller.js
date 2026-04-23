const commentService = require('./comment-service');

const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body; // AMAN: Mengambil data dari JSON Body

    const newComment = await commentService.createComment(postId, userId, content);

    res.status(201).json({
      status: 'success',
      message: 'Komentar berhasil ditambahkan',
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    await commentService.deleteComment(commentId, userId);

    res.status(200).json({
      status: 'success',
      message: 'Komentar berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createComment, deleteComment };