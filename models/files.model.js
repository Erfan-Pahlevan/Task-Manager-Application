const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const { createBaseModel } = require("../models/base.model");

const fileSchema = createBaseModel({
  fieldName: { type: String },
  originalName: { type: String },
  fileName: { type: String, required: true },
  mimeType: { type: String },
  size: { type: Number },
  path: { type: String, required: true },
});

fileSchema.plugin(paginate);

const fileModel = mongoose.model("files", fileSchema, "files");

module.exports = fileModel;
