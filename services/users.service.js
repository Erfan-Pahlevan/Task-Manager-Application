const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const { findPost } = require("./posts.service");

const findUsername = async (username) => {
  return userModel.findOne({ username });
};

const findUserById = async (userId) => {
  return userModel.findById(userId);
};

const isValidPassword = async (password, findUser) => {
  return bcrypt.compare(password, findUser.password);
};

async function setImage(fileId, userId) {
  const findUser = await findUserById(userId);
  findUser.image = fileId;
  findUser.save();
  return findUser;
}

const registerUser = async (username, password, role) => {
  if (!username || !password) {
    throw new Error("username and password are required");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    password: hashedPassword,
    role,
  });
  return user;
};

module.exports = {
  findUsername,
  findUserById,
  isValidPassword,
  registerUser,
  setImage,
};
