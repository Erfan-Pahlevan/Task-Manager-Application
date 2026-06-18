const postModel = require("../../models/posts.model");
const postService = require("../../services/posts.service");

const post = async (req, res) => {
  const { userId } = req;
  const data = req.body;
  const newPost = await postService.create(data, userId);

  res.json({
    newPost,
  });
};

const getPostDetail = async (req, res) => {
  try {
    const { postId } = req.params;
    const findPost = await postModel.findById(postId).populate([
      {
        path: "user",
        //  select: "+password"
      },
    ]);

    if (!findPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      findPost: findPost,
      message: "Post found successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid post ID format or server error",
      error: error.message,
    });
  }
};

const deleteOnePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const findPost = await postService.findPost(postId);
    if (!findPost) {
      return res.status(404).json({
        message: "Post not found fuck",
      });
    }

    await postService.deletePost(postId);

    return res.status(204).json({
      findPost: findPost,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid post ID format or server error",
      error: error.message,
    });
  }
};

async function getAll(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, sort } = req.query;
    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const sortOrder = {};
    if (sort) {
      const order = sort.startsWith("-") ? -1 : 1;
      const field = sort.replace("-", "");
      sortOrder[field] = order;
    }

    paginationCondition = {
      page,
      limit,
      sort: sortOrder,
    };

    const findPosts = await postModel.paginate(filter, paginationCondition);

    if (!findPosts) {
      return res.status(200).json({
        message: "No users in the database",
      });
    }
    res.status(200).json({
      findPosts: findPosts,
      message: "Posts found successfully",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Bad request: could not fetch posts.",
      error: err.message,
    });
  }
}

module.exports = {
  post,
  getPostDetail,
  getAll,
  deleteOnePost,
};
