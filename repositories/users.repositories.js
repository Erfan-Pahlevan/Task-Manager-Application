const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");

const findOne = async (mobile) => {
  return userModel.findOne({ mobile }).select("+password");
};

const findById = async (userId) => {
  return userModel.findById(userId).populate("image");
};

const findByIdAndUpdate = async (id, updates) => {
  return userModel.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
};

const findByIdAndDelete = async (id) => {
  return userModel.findByIdAndDelete(id);
};

const create = async (mobile, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    mobile,
    password: hashedPassword,
    role,
  });
  return user;
};

const paginate = async (filter, options) => {
  return userModel.paginate(filter, options);
};

module.exports = {
  findOne,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  create,
  paginate,
};
