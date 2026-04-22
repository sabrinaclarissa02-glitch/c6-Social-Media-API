const userRepository = require('./userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (payload) => {
  const isExist = await userRepository.findByUsername(payload.userName);
  if (isExist) throw new Error("Username sudah dipakai!");


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(payload.password, salt);

  return await userRepository.create({
    ...payload,
    password: hashedPassword
  });
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("User tidak ditemukan");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    'RAHASIA_NEGARA', 
    { expiresIn: '1d' }
  );

  return { user, token };
};

module.exports = {
  register,
  login
};