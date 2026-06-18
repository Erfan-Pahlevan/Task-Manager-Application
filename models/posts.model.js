const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
});

postSchema.plugin(paginate);

const postModel = mongoose.model("posts", postSchema, "posts");

module.exports = postModel;
