const taskModel = require("../models/tasks.model");

const populateTask = [
  {
    path: "owner",
    select: "-password",
  },
  {
    path: "attachments",
  },
];

const findById = async (id) => {
  return taskModel.findById(id).populate(populateTask);
};

const create = async (data) => {
  return taskModel.create(data);
};

const findByIdAndUpdate = async (id, updates) => {
  return taskModel
    .findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
    .populate(populateTask);
};

const findByIdAndDelete = async (id) => {
  return taskModel.findByIdAndDelete(id);
};

const paginate = async (filter, options) => {
  return taskModel.paginate(filter, {
    ...options,
    populate: populateTask,
  });
};

const findRawById = async (id) => {
  return taskModel.findById(id);
};

const updateStatus = async (id, status) => {
  return taskModel
    .findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
    .populate(populateTask);
};

const pullAttachment = async (taskId, attachmentId) => {
  return taskModel
    .findByIdAndUpdate(
      taskId,
      {
        $pull: {
          attachments: attachmentId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
    .populate(populateTask);
};

const populate = async (task) => {
  return task.populate(populateTask);
};

module.exports = {
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
  paginate,
  findRawById,
  updateStatus,
  pullAttachment,
  populate,
};
