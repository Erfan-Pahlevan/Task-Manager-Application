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

const findByUsername = async (username) => {
  return userModel.findOne({ username }).select("+password");
};

const findUserById = async (userId) => {
  return userModel.findById(userId).populate("image");
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

const registerUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    password: hashedPassword,
    role,
  });
  return user;
};

const findAllUsers = async ({ page, limit, role, search, sort }) => {
  const filter = {};

  if (role) {
    filter.role = role;
  }

  if (search) {
    filter.username = {
      $regex: search,
      $options: "i",
    };
  }

  const options = {
    page,
    limit,
  };

  return userModel.paginate(filter, options);
};

const updateUser = async (id, updates) => {
  return userModel.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  return userModel.findByIdAndDelete(id);
};

module.exports = {
  createToken,
  verifyToken,
  findByUsername,
  updateUser,
  findUserById,
  isValidPassword,
  registerUser,
  setImage,
  findAllUsers,
  deleteUser,
};
