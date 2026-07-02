const express = require("express");
const router = express.Router();

const {
  auth,
  role,
} = require("../middlewares/users/users.middleware");

const {
  isTaskOwner,
} = require("../middlewares/tasks/tasks.middleware");

const {
  validateCreateTask,
  validateCreateTaskAdmin,
  validateUpdateTask,
  validateUpdateTaskAdmin,
  validateTaskIdParam,
  validateChangeStatus,
  validateRemoveAttachment,
} = require("../middlewares/tasks/tasks.validation.middleware");

const {
  createTask,
  createTaskAdmin,
  getMyTasks,
  getTaskDetail,
  updateTask,
  updateTaskAdmin,
  changeTaskStatus,
  deleteTask,
  removeAttachment,
  getListAdmin,
} = require("../controllers/tasks/tasks.controllers");


router.post(
  "/create",
  auth,
  validateCreateTask,
  createTask
);


router.post(
  "/create-admin",
  auth,
  role(["admin", "super_admin"]),
  validateCreateTaskAdmin,
  createTaskAdmin
);


router.get(
  "/get-my-task",
  auth,
  getMyTasks
);


router.get(
  "/get-detail/:id",
  auth,
  validateTaskIdParam,
  isTaskOwner,
  getTaskDetail
);


router.patch(
  "/update/:id",
  auth,
  validateTaskIdParam,
  isTaskOwner,
  validateUpdateTask,
  updateTask
);


router.patch(
  "/change-status/:id",
  auth,
  validateTaskIdParam,
  isTaskOwner,
  validateChangeStatus,
  changeTaskStatus
);


router.delete(
  "/delete/:id",
  auth,
  validateTaskIdParam,
  isTaskOwner,
  deleteTask
);


router.patch(
  "/remove-attachment/:id",
  auth,
  validateTaskIdParam,
  isTaskOwner,
  validateRemoveAttachment,
  removeAttachment
);


router.get(
  "/get-list-admin",
  auth,
  role(["admin", "super_admin"]),
  getListAdmin
);

router.get(
  "/get-detail-admin/:id",
  auth,
  role(["admin", "super_admin"]),
  validateTaskIdParam,
  getTaskDetail
);

router.patch(
  "/update-admin/:id",
  auth,
  role(["admin", "super_admin"]),
  validateTaskIdParam,
  validateUpdateTaskAdmin,
  updateTaskAdmin
);

router.patch(
  "/change-status-admin/:id",
  auth,
  role(["admin", "super_admin"]),
  validateTaskIdParam,
  validateChangeStatus,
  changeTaskStatus
);

router.patch(
  "/remove-attachment-admin/:id",
  auth,
  role(["admin", "super_admin"]),
  validateTaskIdParam,
  validateRemoveAttachment,
  removeAttachment
);

router.delete(
  "/delete-admin/:id",
  auth,
  role(["admin", "super_admin"]),
  validateTaskIdParam,
  deleteTask
);

module.exports = router;