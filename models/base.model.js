const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const createBaseModel = (options) => {
  const schema = new mongoose.Schema(
    {
      ...options,
      isDeleted: { type: Boolean, default: false },
      deletedDate: { type: Date, required: false },
    },
    { timestamps: true },
  );

  // Automatically exclude deleted documents from find queries
  schema.pre(/^find/, function () {
    this.where({ isDeleted: false });
  });

  // Also apply to update queries
  schema.pre(/^update/, function () {
    this.where({ isDeleted: false });
  });

  // Add paginate plugin
  schema.plugin(mongoosePaginate);

  // Safe paginate wrapper (always excludes deleted docs)
  schema.statics.paginateSafe = function (query = {}, options = {}) {
    query.isDeleted = false;
    return this.paginate(query, options);
  };

  return schema;
};

module.exports = {
  createBaseModel,
};
