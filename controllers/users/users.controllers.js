const userService = require("../../services/users.service");

const fileService = require("../../services/files.service");

const registerAdmin = async (req, res) => {
  const { userId } = req;

  const { mobile, password, role } = req.body;

  const findUser = await userService.findByMobile(mobile);
  if (findUser) {
    return res.status(409).json({
      message: "A user is already registered with this phone number",
    });
  }

  const user = await userService.registerUser(mobile, password, role);

  res.status(201).json({
    message: "User registered successfully",
  });
};

const register = async (req, res) => {
  const { mobile, password } = req.body;

  const findUser = await userService.findByMobile(mobile);
  if (findUser) {
    return res.status(409).json({
      message: "A user is already registered with this phone number",
    });
  }

  const user = await userService.registerUser(mobile, password);

  res.status(201).json({
    message: "User registered successfully",
  });
};

const login = async (req, res) => {
  const { mobile, password } = req.body;

  const findUser = await userService.findByMobile(mobile);
  if (!findUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isValidPassword = await userService.isValidPassword(password, findUser);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = await userService.createToken(findUser, process.env.JWTSECRET);

  return res.json({
    token,
  });
};

const getProfile = async (req, res) => {
  const { userId } = req;

  const findUser = await userService.findUserById(userId);

  if (!findUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    user: findUser,
    image: findUser.image
      ? { path: findUser.image.path, filename: findUser.image.fileName }
      : null,
  });
};

const uploadAvatar = async (req, res) => {
  const { originalname, filename, mimetype, size } = req.file;

  const { userId } = req;

  fileData = {
    originalname,
    filename,
    mimetype,
    size,
    path: filename,
    fieldname: "avatar",
  };
  const newfile = await fileService.upload(fileData);

  await userService.setImage(newfile._id, userId);

  res.status(200).json(newfile);
};

const getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const { role, search, sort } = req.query;

  const findUsers = await userService.findAllUsers({
    page,
    limit,
    role,
    search,
    sort,
  });
  if (!findUsers) {
    return res.status(200).json({
      message: "No users in the database",
    });
  }
  res.status(200).json({
    users: findUsers,
    message: "Users found successfully",
  });
};

const getUserDetail = async (req, res) => {
  const { id } = req.params;
  const findUser = await userService.findUserById(id);

  if (!findUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    user: findUser,
    message: "User found successfully",
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedUser = await userService.updateUser(id, updates);

  if (!updatedUser) {
    res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    updatedUser,
    message: "user data updated successfully",
  });
};

const completeUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({
      message: "firstName and lastName needed!",
    });
  }

  const updatedUser = await userService.completeProfile(
    id,
    firstName,
    lastName,
  );

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    updatedUser,
    message: "User data updated successfully",
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await userService.deleteUser(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(204).json({
    message: "user deleted successfully",
  });
};

module.exports = {
  registerAdmin,
  register,
  login,
  getProfile,
  uploadAvatar,
  getAllUsers,
  getUserDetail,
  updateUser,
  completeUser,
  deleteUser,
};
