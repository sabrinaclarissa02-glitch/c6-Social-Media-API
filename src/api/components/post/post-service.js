const mongoose = require('mongoose');
const postRepository = require('./post-repository');
const userRepository = require('../users/user-repository');

const extractMentionUsernames = (content) => {
  const matches = content.match(/@([a-zA-Z0-9_]+)/g) || [];
  return [...new Set(matches.map((item) => item.substring(1).toLowerCase()))];
};

const getMentionedUsers = async (content) => {
  const usernames = extractMentionUsernames(content);
  if (!usernames.length) return [];
  return userRepository.findUsersByUsernames(usernames);
};

const createPost = async ({ userId, content }) => {
  if (!userId || !content) throw new Error('userId and content are required');
  if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid user id');
  if (content.length > 280) throw new Error('Content max 280 characters');

  const user = await userRepository.findUserById(userId);
  if (!user) throw new Error('User not found');

  const mentionedUsers = await getMentionedUsers(content);
  const post = await postRepository.createPost({
    userId,
    content,
    mentions: mentionedUsers.map((u) => u.id),
  });
  return postRepository.findPostById(post.id);
};

const getAllPosts = async () => postRepository.findAllPosts();

const getPostById = async (id) => {
  if (!id) throw new Error('id is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid post id');
  const post = await postRepository.findPostById(id);
  if (!post) throw new Error('Post not found');
  return post;
};

const getPostsByUserId = async (userId) => {
  if (!userId) throw new Error('userId is required');
  if (!mongoose.Types.ObjectId.isValid(userId)) throw new Error('Invalid user id');
  return postRepository.findPostsByUserId(userId);
};

const updatePost = async ({ id, content }) => {
  if (!id || !content) throw new Error('id and content are required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid post id');
  if (content.length > 280) throw new Error('Content max 280 characters');

  const existingPost = await postRepository.findPostById(id);
  if (!existingPost) throw new Error('Post not found');

  const mentionedUsers = await getMentionedUsers(content);
  return postRepository.updatePostById(id, {
    content,
    mentions: mentionedUsers.map((u) => u.id),
    isEdited: true,
  });
};

const deletePost = async (id) => {
  if (!id) throw new Error('id is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid post id');
  const deletedPost = await postRepository.deletePostById(id);
  if (!deletedPost) throw new Error('Post not found');
  return { message: 'Delete post success' };
};

module.exports = { createPost, getAllPosts, getPostById, getPostsByUserId, updatePost, deletePost };
