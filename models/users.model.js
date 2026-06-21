const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const userRoles = require("../constant/userroles/userroles.constants");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: false },
  age: { type: Number, required: false },
  mobile: { type: String, required: false },
  password: { type: String, required: true, select: false }, // better to leave password select to false
  role: {
    type: String,
    enum: Object.values(userRoles),
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "files",
  },
});

userSchema.plugin(paginate);

const userModel = mongoose.model("users", userSchema, "users");

module.exports = userModel;
