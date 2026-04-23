const User = require('../../../models/users-schema');

const createUser = async (payload) => User.create(payload);

const findUserByEmail = async (email) => User.findOne({ email });

const findUserByUsername = async (username) => User.findOne({ username });

const findUsersByUsernames = async (usernames) =>
  User.find({ username: { $in: usernames } });

const findAllUsers = async () =>
  User.find().select('-password -loginCode -loginCodeExpires');

const findUserById = async (id) =>
  User.findById(id).select('-password -loginCode -loginCodeExpires');

const updateUserById = async (id, payload) =>
  User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-password -loginCode -loginCodeExpires');

const deleteUserById = async (id) => User.findByIdAndDelete(id);

const saveLoginCode = async (email, code, expiredAt) =>
  User.findOneAndUpdate(
    { email },
    {
      loginCode: code,
      loginCodeExpires: expiredAt,
    },
    { new: true }
  );

const findUserByEmailAndCode = async (email, code) =>
  User.findOne({
    email,
    loginCode: code,
    loginCodeExpires: { $gt: new Date() },
  });

const clearLoginCodeByUserId = async (id) =>
  User.findByIdAndUpdate(
    id,
    {
      loginCode: null,
      loginCodeExpires: null,
    },
    { new: true }
  );

const updatePrivacyById = async (id, isPrivate) =>
  User.findByIdAndUpdate(
    id,
    { isPrivate },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password -loginCode -loginCodeExpires');

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUsersByUsernames,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  saveLoginCode,
  findUserByEmailAndCode,
  clearLoginCodeByUserId,
  updatePrivacyById,
};
