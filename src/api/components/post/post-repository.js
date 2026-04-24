const Post = require('../../../models/post-schema');

const createPost = async (payload) => Post.create(payload);
const findPostById = async (id) =>
  Post.findById(id).populate('userId', 'name username email').populate('mentions', 'name username email');
const findAllPosts = async () =>
  Post.find().populate('userId', 'name username email').populate('mentions', 'name username email').sort({ createdAt: -1 });
const findPostsByUserId = async (userId) =>
  Post.find({ userId }).populate('userId', 'name username email').populate('mentions', 'name username email').sort({ createdAt: -1 });
const updatePostById = async (id, payload) =>
  Post.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    .populate('userId', 'name username email')
    .populate('mentions', 'name username email');
const deletePostById = async (id) => Post.findByIdAndDelete(id);

module.exports = { createPost, findPostById, findAllPosts, findPostsByUserId, updatePostById, deletePostById };
