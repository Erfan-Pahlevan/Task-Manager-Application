const postService = require("../../services/posts.service");

const isOwner = async (req, res, next) => {
  const { postId } = req.body;
  const findPost = await postService.findPost(postId);

  next();
};

module.exports = { isOwner };
