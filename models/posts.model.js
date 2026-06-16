const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
});

const postModel = mongoose.model("posts", postSchema, "posts");

module.exports = postModel;
