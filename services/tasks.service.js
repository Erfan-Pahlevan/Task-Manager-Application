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

function removeUndefinedFields(data) {
  const result = {};

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      result[key] = data[key];
    }
  });

  return result;
}

const createTask = async (data, ownerId) => {
  const newTask = await taskModel.create({
    title: data.title,
    description: data.description,
    owner: ownerId,
    attachments: data.attachments,
    status: data.status,
    checklist: data.checklist,
  });

  return newTask;
};

const findTaskById = async (id) => {
  const task = await taskModel.findById(id).populate(populateTask);

  return task;
};

const findMyTasks = async ({ userId, page, limit, search, sort, status }) => {
  const filter = {
    owner: userId,
  };

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  return taskModel.paginate(filter, {
    page,
    limit,
    sort: sort || undefined,
    populate: populateTask,
  });
};

const findAllTasksAdmin = async ({ page, limit, search, sort, status, owner }) => {
  const filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  if (owner) {
    filter.owner = owner;
  }

  return taskModel.paginate(filter, {
    page,
    limit,
    sort: sort || undefined,
    populate: populateTask,
  });
};

const updateTask = async (id, data, canUpdateOwner = false) => {
  const updateData = removeUndefinedFields({
    title: data.title,
    description: data.description,
    attachments: data.attachments,
    status: data.status,
    checklist: data.checklist,
    owner: canUpdateOwner ? data.owner : undefined,
  });

  const updatedTask = await taskModel
    .findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
    .populate(populateTask);

  return updatedTask;
};

const changeTaskStatus = async (id, status) => {
  const updatedTask = await taskModel
    .findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )
    .populate(populateTask);

  return updatedTask;
};

const deleteTask = async (id) => {
  const deletedTask = await taskModel.findByIdAndDelete(id);

  return deletedTask;
};

const removeAttachment = async (taskId, attachmentId) => {
  const updatedTask = await taskModel
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

  return updatedTask;
};

module.exports = {
  createTask,
  findTaskById,
  findMyTasks,
  findAllTasksAdmin,
  updateTask,
  changeTaskStatus,
  deleteTask,
  removeAttachment,
};