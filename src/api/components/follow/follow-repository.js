const { Follows } = require('../../../models');

const createFollow = async (followerId, followingId) => {
  return await Follows.create({ followerId, followingId });
};

const deleteFollow = async (followerId, followingId) => {
  return await Follows.deleteOne({ followerId, followingId });
};

module.exports = { createFollow, deleteFollow };