const userRoles = require("../../constants/userRoles/userRoles.constants");

function validateRegister(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 400,
      message: "request body is required",
    });
  }

  const { mobile, password, role } = req.body;

  if (!mobile || !password || !role) {
    return res.status(400).json({
      status: 400,
      message: "mobile, password and role are required",
    });
  }

  // TODO: write validator for mobile
  // if (typeof mobile !== "string" || username.trim().length < 3) {
  //   return res.status(400).json({
  //     status: 400,
  //     message: "username must be at least 3 characters",
  //   });
  // }

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

  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({
      status: 400,
      message: "username and password are required",
    });
  }

  // if (typeof mobile !== "string") {
  //   return res.status(400).json({
  //     status: 400,
  //     message: "username must be a string",
  //   });
  // }

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
