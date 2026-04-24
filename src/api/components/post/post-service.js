const mongoose = require('mongoose');
const postRepository = require('./post-repository');
const userRepository = require('../users/user-repository');

const extractMentionUsernames = (content) => {
  const matches = content.match(/@([a-zA-Z0-9_]+)/g) || [];
  const usernames = matches.map((item) => item.substring(1).toLowerCase());

  return [...new Set(usernames)];
};

const getMentionedUsers = async (content) => {
  const mentionedUsernames = extractMentionUsernames(content);
  if (mentionedUsernames.length > 0) {
    return await userRepository.findUsersByUsernames(mentionedUsernames);
  }
  return [];
};

const validatePostData = (data, isUpdate = false) => {
  const { id, userId, content } = data;

  if (isUpdate) {
    if (!id || !content) {
      throw new Error('id and content are required');
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid post id');
    }
  } else {
    if (!userId || !content) {
      throw new Error('userId and content are required');
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user id');
    }
  }

  if (content.length > 280) {
    throw new Error('Content max 280 characters');
  }
};

const createPost = async (payload) => {
  const { userId, content } = payload;

  validatePostData(payload);

  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const mentionedUsers = await getMentionedUsers(content);

  const newPost = await postRepository.createPost({
    userId,
    content,
    mentions: mentionedUsers.map((mentionedUser) => mentionedUser.id),
  });

  return postRepository.findPostById(newPost.id);
};

const updatePost = async (payload) => {
  const { id, content } = payload;

  validatePostData(payload, true);

  const existingPost = await postRepository.findPostById(id);
  if (!existingPost) {
    throw new Error('Post not found');
  }

  const mentionedUsers = await getMentionedUsers(content);

  return postRepository.updatePostById(id, {
    content,
    mentions: mentionedUsers.map((mentionedUser) => mentionedUser.id),
    isEdited: true,
  });
};

const deletePost = async (id) => {
  if (!id) {
    throw new Error('id is required');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid post id');
  }

  const deletedPost = await postRepository.deletePostById(id);

  if (!deletedPost) {
    throw new Error('Post not found');
  }

  return {
    message: 'Delete post success',
  };
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
};
