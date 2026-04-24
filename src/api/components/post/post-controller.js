const postService = require('./post-service');

const createPost = async (req, res, next) => { try {
  const userId = req.user?.id || req.body.userId;
  const result = await postService.createPost({ userId, content: req.body.content });
  res.status(201).json({ success: true, message: 'Create post success', data: result });
} catch (error) { next(error); } };

const getAllPosts = async (req, res, next) => { try {
  const result = await postService.getAllPosts();
  res.status(200).json({ success: true, message: 'Get posts success', data: result });
} catch (error) { next(error); } };

const getPostById = async (req, res, next) => { try {
  const id = req.params.id || req.body.id;
  const result = await postService.getPostById(id);
  res.status(200).json({ success: true, message: 'Get post success', data: result });
} catch (error) { next(error); } };

const getPostsByUserId = async (req, res, next) => { try {
  const userId = req.params.userId || req.body.userId;
  const result = await postService.getPostsByUserId(userId);
  res.status(200).json({ success: true, message: 'Get user posts success', data: result });
} catch (error) { next(error); } };

const updatePost = async (req, res, next) => { try {
  const result = await postService.updatePost(req.body);
  res.status(200).json({ success: true, message: 'Update post success', data: result });
} catch (error) { next(error); } };

const deletePost = async (req, res, next) => { try {
  const id = req.params.id || req.body.id;
  const result = await postService.deletePost(id);
  res.status(200).json({ success: true, message: result.message });
} catch (error) { next(error); } };

module.exports = { createPost, getAllPosts, getPostById, getPostsByUserId, updatePost, deletePost };
