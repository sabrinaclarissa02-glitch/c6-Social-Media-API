const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userRepository = require('./user-repository');
const config = require('../../../core/config');

function safeUser(user) {
  return {
    _id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    age: user.age,
    bio: user.bio,
    isPrivate: user.isPrivate,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    config.jwtSecret,
    { expiresIn: '1d' }
  );
}

const register = async (payload) => {
  const { name, username, email, password, age, bio } = payload;
  if (!name || !username || !email || !password) {
    throw new Error('name, username, email, and password are required');
  }

  const normalizedEmail = email.toLowerCase();
  const normalizedUsername = username.toLowerCase();

  const existingEmail = await userRepository.findUserByEmail(normalizedEmail);
  if (existingEmail) throw new Error('Email already registered');

  const existingUsername = await userRepository.findUserByUsername(normalizedUsername);
  if (existingUsername) throw new Error('Username already used');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    name,
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
    age,
    bio,
  });

  return safeUser(newUser);
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error('email and password are required');

  const user = await userRepository.findUserByEmail(email.toLowerCase());
  if (!user) throw new Error('Email not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Wrong password');

  return { token: createToken(user), user: safeUser(user) };
};

const requestLoginCode = async (email) => {
  if (!email) throw new Error('Email is required');

  const user = await userRepository.findUserByEmail(email.toLowerCase());
  if (!user) throw new Error('Email not found');

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiredAt = new Date(Date.now() + 5 * 60 * 1000);
  await userRepository.saveLoginCode(email.toLowerCase(), code, expiredAt);

  return { email: user.email, code, expiredAt };
};

const loginWithCode = async (payload) => {
  const { email, code } = payload;
  if (!email || !code) throw new Error('email and code are required');

  const user = await userRepository.findUserByEmailAndCode(email.toLowerCase(), code);
  if (!user) throw new Error('Code invalid or expired');

  await userRepository.clearLoginCodeByUserId(user.id);
  return { token: createToken(user), user: safeUser(user) };
};

const getAllUsers = async () => userRepository.findAllUsers();

const getUserById = async (id) => {
  if (!id) throw new Error('id is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid user id');

  const user = await userRepository.findUserById(id);
  if (!user) throw new Error('User not found');

  if (user.isPrivate) {
    return {
      _id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      isPrivate: user.isPrivate,
      message: 'This account is private',
    };
  }

  return user;
};

const updatePrivacy = async (payload) => {
  const { id, isPrivate } = payload;
  if (!id) throw new Error('id is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid user id');
  if (typeof isPrivate !== 'boolean') throw new Error('isPrivate must be true or false');

  const updatedUser = await userRepository.updatePrivacyById(id, isPrivate);
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
};

const updateUser = async (payload) => {
  const { id, ...updateData } = payload;
  if (!id) throw new Error('id is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid user id');

  const user = await userRepository.findUserByIdWithPassword(id);
  if (!user) throw new Error('User not found');

  if (updateData.username) {
    const usernameLower = updateData.username.toLowerCase();
    const existingUsername = await userRepository.findUserByUsername(usernameLower);
    if (existingUsername && existingUsername.id.toString() !== id) throw new Error('Username already used');
    updateData.username = usernameLower;
  }

  if (updateData.email) {
    const emailLower = updateData.email.toLowerCase();
    const existingEmail = await userRepository.findUserByEmail(emailLower);
    if (existingEmail && existingEmail.id.toString() !== id) throw new Error('Email already registered');
    updateData.email = emailLower;
  }

  if (updateData.password) updateData.password = await bcrypt.hash(updateData.password, 10);

  const updatedUser = await userRepository.updateUserById(id, updateData);
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
};

const deleteUser = async (id) => {
  if (!id) throw new Error('id is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid user id');

  const deletedUser = await userRepository.deleteUserById(id);
  if (!deletedUser) throw new Error('User not found');

  return { message: 'Delete user success' };
};

module.exports = {
  register,
  login,
  requestLoginCode,
  loginWithCode,
  getAllUsers,
  getUserById,
  updatePrivacy,
  updateUser,
  deleteUser,
};
