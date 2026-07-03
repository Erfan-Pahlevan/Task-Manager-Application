const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const userRoles = require("../constants/userRoles/userRoles.constants");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  mobile: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: Object.values(userRoles),
    required: true,
    default: "user",
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
