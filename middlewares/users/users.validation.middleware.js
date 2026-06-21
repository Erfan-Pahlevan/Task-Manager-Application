const userRoles = require("../../constant/userroles/userroles.constants");

function validateRegister(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "request body is required",
    });
  }

  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "username and password are required",
    });
  }

  if (typeof username !== "string" || username.trim().length < 3) {
    return res.status(400).json({
      status: 400,
      message: "username must be at least 3 characters",
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      status: 400,
      message: "password must be at least 6 characters",
    });
  }

  if (!role || typeof role !== "string") {
    return res.status(400).json({
      status: 400,
      message: "role must be a string",
    });
  }

  if (role && !Object.values(userRoles).includes(role)) {
    return res.status(400).json({
      status: 400,
      message: "Role type is not valid!",
    });
  }

  next();
}

function validateLogin(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "request body is required",
    });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "username and password are required",
    });
  }

  if (typeof username !== "string") {
    return res.status(400).json({
      status: 400,
      message: "username must be a string",
    });
  }

  if (typeof password !== "string") {
    return res.status(400).json({
      status: 400,
      message: "password must be a string",
    });
  }

  next();
}

module.exports = {
  validateRegister,
  validateLogin,
};
