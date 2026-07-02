const userService = require("../../services/users.service");
const postService = require("../../services/posts.service");

const userModel = require("../../models/users.model");

// Local middleware
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized: No provided token",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = await userService.verifyToken(token, process.env.JWTSECRET);
    req.userId = payload.userId;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: Wrong token format",
      error: err.message,
    });
  }
};

const isOwner = async (req, res, next) => {
  const { userId } = req;
  const { postId } = req.body;

  const findPost = await postService.findPost(postId);

  if (!findPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (findPost.user._id.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

const isSameUser = async (req, res, next) => {
  const { userId } = req;

  const { id } = req.params;

  const findUser = await userService.findUserById(id);

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log(findUser);
  console.log(userId);

  if (findUser._id.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

function role(roles) {
  return async (req, res, next) => {
    const { userId } = req;
    const findUser = await userModel.findById(userId);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(findUser);

    if (!roles.includes(findUser.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}

module.exports = { auth, isOwner, isSameUser, role };
