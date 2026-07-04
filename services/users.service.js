const userRepository = require("../repositories/users.repositories");
const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createToken(findUser, JWTSECRET) {
  return jwt.sign(
    {
      userId: findUser._id,
    },
    JWTSECRET,
  );
}

const verifyToken = async (token, JWTSECRET) => {
  return jwt.verify(token, JWTSECRET);
};

const findByMobile = async (mobile) => {
  return userRepository.findOne(mobile);
};

const findUserById = async (userId) => {
  return userRepository.findById(userId);
};

const isValidPassword = async (password, findUser) => {
  return bcrypt.compare(password, findUser.password);
};

async function setImage(fileId, userId) {
  const findUser = await findUserById(userId);
  findUser.image = fileId;
  await findUser.save();
  return findUser;
}

const registerUser = async (mobile, password, role) => {
  return userRepository.create(mobile, password, role);
};

const findAllUsers = async ({ page, limit, role, search, sort }) => {
  const filter = {};

  if (role) {
    filter.role = role;
  }

  const options = {
    page,
    limit,
  };

  return userRepository.paginate(filter, options);
};

const updateUser = async (id, updates) => {
  return userRepository.findByIdAndUpdate(id, updates);
};

const findUser = async (id) => {
  return userRepository.findById(id);
};

const completeProfile = async (id, firstName, lastName) => {
  const user = await userRepository.findById(id);
  if (!user) return null;

  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();

  return user;
};

const deleteUser = async (id) => {
  return userRepository.findByIdAndDelete(id);
};

const changeUserRole = async (id, role) => {
  const findUser = await userRepository.findById(id);
  if (!findUser) return null;

  findUser.role = role;
  await findUser.save();
  return findUser;
};

module.exports = {
  createToken,
  verifyToken,
  findByMobile,
  updateUser,
  findUser,
  findUserById,
  isValidPassword,
  registerUser,
  setImage,
  findAllUsers,
  completeProfile,
  deleteUser,
  changeUserRole,
};
