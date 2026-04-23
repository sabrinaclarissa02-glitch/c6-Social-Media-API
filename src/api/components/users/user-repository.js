const User = require('./users-schema');

const createUser = async (payload) => {
  return await User.create(payload);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const findUsersByUsernames = async (usernames) => {
  return await User.find({ username: { $in: usernames } });
};

const findAllUsers = async () => {
  return await User.find().select('-password -loginCode -loginCodeExpires');
};

const findUserById = async (id) => {
  return await User.findById(id).select('-password -loginCode -loginCodeExpires');
};

const updateUserById = async (id, payload) => {
  return await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-password -loginCode -loginCodeExpires');
};

const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

const saveLoginCode = async (email, code, expiredAt) => {
  return await User.findOneAndUpdate(
    { email },
    {
      loginCode: code,
      loginCodeExpires: expiredAt,
    },
    { new: true }
  );
};

const findUserByEmailAndCode = async (email, code) => {
  return await User.findOne({
    email,
    loginCode: code,
    loginCodeExpires: { $gt: new Date() },
  });
};

const clearLoginCodeByUserId = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    {
      loginCode: null,
      loginCodeExpires: null,
    },
    { new: true }
  );
};

const updatePrivacyById = async (id, isPrivate) => {
  return await User.findByIdAndUpdate(
    id,
    { isPrivate },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password -loginCode -loginCodeExpires');
};

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
