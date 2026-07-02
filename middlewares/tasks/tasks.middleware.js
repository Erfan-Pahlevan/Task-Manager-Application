const taskService = require("../../services/tasks.service");

const isTaskOwner = async (req, res, next) => {
  try {
    const { userId } = req;

    const taskId = req.params.id || req.body.taskId;

    if (!taskId) {
      return res.status(400).json({
        status: 400,
        message: "taskId is required",
      });
    }

    const task = await taskService.findTaskById(taskId);

    if (!task) {
      return res.status(404).json({
        status: 404,
        message: "task not found",
      });
    }

    const ownerId = task.owner._id || task.owner;

    if (ownerId.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 403,
        message: "forbidden",
      });
    }

    req.task = task;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isTaskOwner };
