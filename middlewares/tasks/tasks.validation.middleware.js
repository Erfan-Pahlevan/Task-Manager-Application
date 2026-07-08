const mongoose = require("mongoose");
const taskStatus = require("../../constants/taskStatus/taskStatus.constants");

function validateCreateTask(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "request body is required",
    });
  }

  const { title, description, attachments, status, checklist } = req.body;

  if (!title) {
    return res.status(400).json({
      status: 400,
      message: "title is required",
    });
  }

  if (typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({
      status: 400,
      message: "title must be at least 3 characters",
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      status: 400,
      message: "description must be a string",
    });
  }

  if (attachments !== undefined) {
    if (!Array.isArray(attachments)) {
      return res.status(400).json({
        status: 400,
        message: "attachments must be an array",
      });
    }

    for (const fileId of attachments) {
      if (!mongoose.Types.ObjectId.isValid(fileId)) {
        return res.status(400).json({
          status: 400,
          message: "attachment id is invalid",
        });
      }
    }
  }

  if (status !== undefined && !Object.values(taskStatus).includes(status)) {
    return res.status(400).json({
      status: 400,
      message: "status is invalid",
    });
  }

  if (checklist !== undefined) {
    if (!Array.isArray(checklist)) {
      return res.status(400).json({
        status: 400,
        message: "checklist must be an array",
      });
    }

    for (const item of checklist) {
      if (!item.text || typeof item.text !== "string") {
        return res.status(400).json({
          status: 400,
          message: "each checklist item must have text",
        });
      }

      if (item.is_done !== undefined && typeof item.is_done !== "boolean") {
        return res.status(400).json({
          status: 400,
          message: "is_done must be boolean",
        });
      }
    }
  }

  next();
}

function validateCreateTaskAdmin(req, res, next) {
  const { owner } = req.body;

  if (!owner) {
    return res.status(400).json({
      status: 400,
      message: "owner is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(400).json({
      status: 400,
      message: "owner is invalid",
    });
  }

  return validateCreateTask(req, res, next);
}

function validateUpdateTaskBase(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "request body is required",
    });
  }

  const { title, description, attachments, status, checklist } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim().length < 3)
  ) {
    return res.status(400).json({
      status: 400,
      message: "title must be at least 3 characters",
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      status: 400,
      message: "description must be a string",
    });
  }

  if (attachments !== undefined) {
    if (!Array.isArray(attachments)) {
      return res.status(400).json({
        status: 400,
        message: "attachments must be an array",
      });
    }

    for (const fileId of attachments) {
      if (!mongoose.Types.ObjectId.isValid(fileId)) {
        return res.status(400).json({
          status: 400,
          message: "attachment id is invalid",
        });
      }
    }
  }

  if (status !== undefined && !Object.values(taskStatus).includes(status)) {
    return res.status(400).json({
      status: 400,
      message: "status is invalid",
    });
  }

  if (checklist !== undefined) {
    if (!Array.isArray(checklist)) {
      return res.status(400).json({
        status: 400,
        message: "checklist must be an array",
      });
    }

    for (const item of checklist) {
      if (!item.text || typeof item.text !== "string") {
        return res.status(400).json({
          status: 400,
          message: "each checklist item must have text",
        });
      }

      if (item.is_done !== undefined && typeof item.is_done !== "boolean") {
        return res.status(400).json({
          status: 400,
          message: "is_done must be boolean",
        });
      }
    }
  }

  next();
}

function validateUpdateTask(req, res, next) {
  if (req.body.owner !== undefined) {
    return res.status(400).json({
      status: 400,
      message: "owner cannot be updated by user",
    });
  }

  return validateUpdateTaskBase(req, res, next);
}

function validateUpdateTaskAdmin(req, res, next) {
  const { owner } = req.body;

  if (owner !== undefined && !mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(400).json({
      status: 400,
      message: "owner is invalid",
    });
  }

  return validateUpdateTaskBase(req, res, next);
}

function validateTaskIdParam(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "task id is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "task id is invalid",
    });
  }

  next();
}

function validateChangeStatus(req, res, next) {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      status: 400,
      message: "status is required",
    });
  }

  if (!Object.values(taskStatus).includes(status)) {
    return res.status(400).json({
      status: 400,
      message: "status is invalid",
    });
  }

  next();
}

function validateRemoveAttachment(req, res, next) {
  const { attachmentId } = req.body;

  if (!attachmentId) {
    return res.status(400).json({
      status: 400,
      message: "attachmentId is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(attachmentId)) {
    return res.status(400).json({
      status: 400,
      message: "attachmentId is invalid",
    });
  }

  next();
}

function validateToggleChecklist(req,res,next){

  const { checklistId } = req.body;


  if(!checklistId){
    return res.status(400).json({
      status:400,
      message:"checklistId is required"
    });
  }


  if(!mongoose.Types.ObjectId.isValid(checklistId)){
    return res.status(400).json({
      status:400,
      message:"checklistId is invalid"
    });
  }


  next();
}

module.exports = {
  validateCreateTask,
  validateCreateTaskAdmin,
  validateUpdateTask,
  validateUpdateTaskAdmin,
  validateTaskIdParam,
  validateChangeStatus,
  validateRemoveAttachment,
  validateToggleChecklist
};