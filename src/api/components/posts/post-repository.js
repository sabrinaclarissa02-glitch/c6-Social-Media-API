const Post = require('./post-schema');

const createPost = async (payload) => {
  return await Post.create(payload);
};

const findPostById = async (id) => {
  return await Post.findById(id)
    .populate('userId', 'name username email')
    .populate('mentions', 'name username email');
};

const updatePostById = async (id, payload) => {
  return await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate('userId', 'name username email')
    .populate('mentions', 'name username email');
};

const deletePostById = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  createPost,
  findPostById,
  updatePostById,
  deletePostById,
};
