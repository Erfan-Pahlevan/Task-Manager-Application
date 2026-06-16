const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: false },
  age: { type: Number, required: false },
  mobile: { type: String, required: false },
  password: { type: String, required: true }, // better to leave password select to false
  role: { type: String, default: "user" },
});

const userModel = mongoose.model("users", userSchema, "users");

module.exports = userModel;
