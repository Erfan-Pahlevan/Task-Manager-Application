const taskRepository = require("../repositories/tasks.repositories");
const taskStatus = require("../constants/taskStatus/taskStatus.constants");

function removeUndefinedFields(data) {
  const result = {};

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      result[key] = data[key];
    }
  });

  return result;
}
// create new task
const createTask = async (data, ownerId) => {
  const newTask = await taskRepository.create({
    title: data.title,
    description: data.description,
    owner: ownerId,
    attachments: data.attachments,
    status: data.status,
    checklist: data.checklist,
  });

  return newTask;
};

// get detail for a task
const findTaskById = async (id) => {
  return taskRepository.findById(id);
};

// get all myself tasks
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

  return taskRepository.paginate(filter, {
    page,
    limit,
    sort: sort || undefined,
  });
};

// get all tasks by admin
const findAllTasksAdmin = async ({
  page,
  limit,
  search,
  sort,
  status,
  owner,
}) => {
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

  return taskRepository.paginate(filter, {
    page,
    limit,
    sort: sort || undefined,
  });
};

// update task
const updateTask = async (id, data, canUpdateOwner = false) => {
  const updateData = removeUndefinedFields({
    title: data.title,
    description: data.description,
    attachments: data.attachments,
    status: data.status,
    checklist: data.checklist,
    owner: canUpdateOwner ? data.owner : undefined,
  });

  return taskRepository.findByIdAndUpdate(id, updateData);
};

// change task status
const changeTaskStatus = async (id, status) => {
  return taskRepository.updateStatus(id, status);
};

// delete task
const deleteTask = async (id) => {
  return taskRepository.findByIdAndDelete(id);
};

// for remove task attachment
const removeAttachment = async (taskId, attachmentId) => {
  return taskRepository.pullAttachment(taskId, attachmentId);
};

// for update status by checklist
const updateTaskStatusByChecklist = (checklist) => {
  if (!checklist || checklist.length === 0) {
    return taskStatus.TODO;
  }

  const isAllDone = checklist.every((item) => item.is_done === true);

  const isNothingDone = checklist.every((item) => item.is_done === false);

  if (isAllDone) {
    return taskStatus.DONE;
  }

  if (isNothingDone) {
    return taskStatus.TODO;
  }

  return taskStatus.IN_PROGRESS;
};

// change checklist status
const toggleChecklistItem = async (taskId, checklistId) => {
  const task = await taskRepository.findRawById(taskId);

  if (!task) {
    return null;
  }

  const checklistItem = task.checklist.id(checklistId);

  if (!checklistItem) {
    return null;
  }

  checklistItem.is_done = !checklistItem.is_done;

  task.status = updateTaskStatusByChecklist(task.checklist);

  await task.save();

  await taskRepository.populate(task);

  return task;
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
  toggleChecklistItem,
};