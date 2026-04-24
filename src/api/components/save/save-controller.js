const saveService = require('./save-service');

const savePost = async (req, res, next) => {
  try {
    const data = await saveService.savePost(req.user.id, req.params.postId);
    res.status(201).json({ success: true, message: 'Post berhasil disimpan', data });
  } catch (error) { next(error); }
};

const unsavePost = async (req, res, next) => {
  try {
    const data = await saveService.unsavePost(req.user.id, req.params.postId);
    res.status(200).json({ success: true, message: 'Post berhasil dihapus dari simpanan', data });
  } catch (error) { next(error); }
};

const getSavedPosts = async (req, res, next) => {
  try {
    const data = await saveService.getSavedPosts(req.user.id);
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

module.exports = { savePost, unsavePost, getSavedPosts };
