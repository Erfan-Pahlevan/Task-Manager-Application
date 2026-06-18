const jwt = require("jsonwebtoken");

const userService = require("../../services/users.service");
const postService = require("../../services/posts.service");

const userModel = require("../../models/users.model");

const checkAuthHeader = (req, res, next) => {
  // Check if the specific header exists
  if (!req.headers["userid"]) {
    // 1. Set an appropriate HTTP Status (401 Unauthorized)
    // 2. Send an actual response so the request closes
    return res.status(401).json({
      error: "Access Denied. Missing required authorization header.",
    });
  }

  // If the header is there, move to the next handler!
  next();
};

// Local middleware
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized: Ur not allowed",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    req.userId = payload.userId;

    console.log("userId in auth:", req.userId);

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized: lol",
      error: err.message,
    });
  }
};

const isOwner = async (req, res, next) => {
  const { userId } = req;
  const { postId } = req.body;

  console.log("userId:", userId);
  console.log("postId:", postId);

  const findPost = await postService.findPost(postId);

  console.log(findPost);

  if (!findPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (findPost.user._id.toString() !== userId.toString()) {
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

    if (!roles.includes(findUser.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}

module.exports = { checkAuthHeader, auth, isOwner, role };
