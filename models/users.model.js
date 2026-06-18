const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: false },
  age: { type: Number, required: false },
  mobile: { type: String, required: false },
  password: { type: String, required: true }, // better to leave password select to false
  role: { type: String, default: "user" },
  image: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "files" },
});

userSchema.plugin(paginate);

const userModel = mongoose.model("users", userSchema, "users");

module.exports = userModel;
