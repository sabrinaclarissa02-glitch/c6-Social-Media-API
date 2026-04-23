const Follow = require('../../../models/follow-schema'); 

const createFollow = async (followerId, followingId) => {
  return await Follow.create({ followerId, followingId });
};

const deleteFollow = async (followerId, followingId) => {
  return await Follow.findOneAndDelete({ followerId, followingId });
};

module.exports = {
  createFollow,
  deleteFollow
};