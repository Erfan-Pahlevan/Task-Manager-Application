// const post = async (title, content) => {
//   return postModel.create({ title, content });
// };

const postModel = require("../models/posts.model");

const create = async (data, userId) => {
  const newPost = await postModel.create({
    title: data.title,
    content: data.content,
    user: userId,
  });

  return newPost;
};

const deletePost = async (data) => {
  return postModel.findByIdAndDelete(data);
};

const findPost = async (data) => {
  return postModel.findById(data).populate([
    {
      path: "user",
      // select: "+password"
    },
  ]);
};

module.exports = { create, deletePost, findPost };
