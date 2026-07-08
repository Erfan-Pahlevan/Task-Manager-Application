const taskService = require("../../services/tasks.service");

const createTask = async (req, res, next) => {
  try {
    const { userId } = req;
    const data = req.body;

    const newTask = await taskService.createTask(data, userId);

    return res.status(201).json({
      status: 201,
      data: newTask,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const createTaskAdmin = async (req, res, next) => {
  try {
    const data = req.body;
    const ownerId = data.owner;

    const newTask = await taskService.createTask(data, ownerId);

    return res.status(201).json({
      status: 201,
      data: newTask,
      message: "Task created successfully by admin",
    });
  } catch (error) {
    next(error);
  }
};

const getTaskDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = req.task || await taskService.findTaskById(id);

    if (!task) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: 200,
      data: task,
      message: "Task found successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMyTasks = async (req, res, next) => {
  try {
    const { userId } = req;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, sort, status } = req.query;

    const tasks = await taskService.findMyTasks({
      userId,
      page,
      limit,
      search,
      sort,
      status,
    });

    return res.status(200).json({
      status: 200,
      data: tasks,
      message: "Tasks found successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getListAdmin = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, sort, status, owner } = req.query;

    const tasks = await taskService.findAllTasksAdmin({
      page,
      limit,
      search,
      sort,
      status,
      owner,
    });

    return res.status(200).json({
      status: 200,
      data: tasks,
      message: "Tasks found successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedTask = await taskService.updateTask(id, req.body);

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: 200,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedTask = await taskService.updateTask(id, req.body, true);

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: 200,
      data: updatedTask,
      message: "Task updated successfully by admin",
    });
  } catch (error) {
    next(error);
  }
};

const changeTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await taskService.changeTaskStatus(id, status);

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: 200,
      data: updatedTask,
      message: "Task status changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskService.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const removeAttachment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { attachmentId } = req.body;

    const updatedTask = await taskService.removeAttachment(id, attachmentId);

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: 200,
      data: updatedTask,
      message: "Attachment removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const toggleChecklistItem = async(req,res,next)=>{
  try{

    const {id} = req.params;
    const {checklistId} = req.body;


    const task = await taskService.toggleChecklistItem(
      id,
      checklistId
    );


    if(!task){
      return res.status(404).json({
        status:404,
        message:"Task or checklist item not found"
      });
    }


    return res.status(200).json({
      status:200,
      data:task,
      message:"Checklist updated successfully"
    });


  }catch(error){
    next(error);
  }
}

module.exports = {
  createTask,
  createTaskAdmin,
  getTaskDetail,
  getMyTasks,
  getListAdmin,
  updateTask,
  updateTaskAdmin,
  changeTaskStatus,
  deleteTask,
  removeAttachment,
  toggleChecklistItem
};