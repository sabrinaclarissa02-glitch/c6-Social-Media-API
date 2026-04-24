const commentService = require('./comment-service');

const createComment = async (req, res, next) => { try {
  const userId = req.user?.id || req.body.userId;
  const data = await commentService.createComment(req.params.postId, userId, req.body.content);
  res.status(201).json({ success: true, message: 'Komentar berhasil ditambahkan', data });
} catch (error) { next(error); } };

const deleteComment = async (req, res, next) => { try {
  const userId = req.user?.id || req.body.userId;
  await commentService.deleteComment(req.params.commentId, userId);
  res.status(200).json({ success: true, message: 'Komentar berhasil dihapus' });
} catch (error) { next(error); } };

const getCommentsByPostId = async (req, res, next) => { try {
  const data = await commentService.getCommentsByPostId(req.params.postId);
  res.status(200).json({ success: true, data });
} catch (error) { next(error); } };

module.exports = { createComment, deleteComment, getCommentsByPostId };
