const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const taskStatus = require("../constants/taskStatus/taskStatus.constants");
const { createBaseModel } = require("../models/base.model");

const taskSchema = createBaseModel({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "files",
      required: false,
    },
  ],
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.TODO,
    required: true,
  },
  checklist: [
    {
      text: {
        type: String,
        required: true,
      },
      is_done: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

taskSchema.plugin(paginate);

const taskModel = mongoose.model("tasks", taskSchema, "tasks");

module.exports = taskModel;
