const express = require("express");
const router = express.Router();
const userRoles = require("../constants/userRoles/userRoles.constants");
const { auth, role } = require("../middlewares/users/users.middleware");
const { isTaskOwner } = require("../middlewares/tasks/tasks.middleware");

const {
  validateCreateTask,
  validateCreateTaskAdmin,
  validateUpdateTask,
  validateUpdateTaskAdmin,
  validateTaskIdParam,
  validateChangeStatus,
  validateRemoveAttachment,
  validateToggleChecklist
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
  toggleChecklistItem
} = require("../controllers/tasks/tasks.controllers");

const adminRoles = [userRoles.ADMIN, userRoles.SUPERADMIN];

router.post("/create", auth, validateCreateTask, createTask);

router.get("/get-my-tasks", auth, getMyTasks);

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

router.patch(
  "/update-checklist/:id",
  auth,
  validateTaskIdParam,
  isTaskOwner,
  validateToggleChecklist,
  toggleChecklistItem
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

router.post(
  "/create-admin",
  auth,
  role(adminRoles),
  validateCreateTaskAdmin,
  createTaskAdmin
);

router.get("/get-list-admin", auth, role(adminRoles), getListAdmin);

router.get(
  "/get-detail-admin/:id",
  auth,
  role(adminRoles),
  validateTaskIdParam,
  getTaskDetail
);

router.patch(
  "/update-admin/:id",
  auth,
  role(adminRoles),
  validateTaskIdParam,
  validateUpdateTaskAdmin,
  updateTaskAdmin
);

router.patch(
  "/change-status-admin/:id",
  auth,
  role(adminRoles),
  validateTaskIdParam,
  validateChangeStatus,
  changeTaskStatus
);

router.patch(
  "/update-checklist-admin/:id",
  auth,
  role(adminRoles),
  validateTaskIdParam,
  validateToggleChecklist,
  toggleChecklistItem
);

router.patch(
  "/remove-attachment-admin/:id",
  auth,
  role(adminRoles),
  validateTaskIdParam,
  validateRemoveAttachment,
  removeAttachment
);

router.delete(
  "/delete-admin/:id",
  auth,
  role(adminRoles),
  validateTaskIdParam,
  deleteTask
);

module.exports = router;