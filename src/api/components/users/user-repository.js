const User = require('../models/User'); 

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByUsername = async (userName) => {
  return await User.findOne({ userName });
};

const findById = async (id) => {
  return await User.findById(id);
};

const create = async (userData) => {
  return await User.create(userData);
};


module.exports = {
  findByEmail,
  findByUsername,
  findById,
  create
};