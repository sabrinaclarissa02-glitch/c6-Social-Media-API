const statusRepository = require('./status-repository');

const getUserStatus = async (userId) => {
  const data = await statusRepository.getUserStats(userId);

  return data;
};

module.exports = {
  getUserStatus,
};
