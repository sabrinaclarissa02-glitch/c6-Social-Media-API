const likeService = require('./like-service');

const likePost = async (req, res, next) => { try {
  await likeService.likePost(req.user.id, req.params.postId);
  res.status(201).json({ success: true, message: 'Post berhasil disukai' });
} catch (error) { next(error); } };

const unlikePost = async (req, res, next) => { try {
  await likeService.unlikePost(req.user.id, req.params.postId);
  res.status(200).json({ success: true, message: 'Like berhasil dihapus' });
} catch (error) { next(error); } };

const getLikeCount = async (req, res, next) => { try {
  const likeCount = await likeService.getLikeCount(req.params.postId);
  res.status(200).json({ success: true, data: { postId: req.params.postId, likeCount } });
} catch (error) { next(error); } };

module.exports = { likePost, unlikePost, getLikeCount };
