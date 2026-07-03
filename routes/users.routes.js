const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const rateLimitMiddleware = require("../middlewares/rateLimit.middleware");

const {
  auth,
  role,
  isProfileOwner,
} = require("../middlewares/users/users.middleware");

const {
  validateRegister,
  validateRegisterAdmin,
  validateLogin,
} = require("../middlewares/users/users.validation.middleware");

const {
  registerAdmin,
  register,
  login,
  getProfile,
  uploadAvatar,
  getAllUsers,
  getUserDetail,
  updateUser,
  completeUser,
  deleteUser,
  changeUserRole,
} = require("../controllers/users/users.controllers");

router.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

router.post(
  "/register-admin",
  auth,
  rateLimitMiddleware(15 * 60 * 1000, 20),
  validateRegisterAdmin,
  role(["superadmin"]),
  registerAdmin,
);
router.post(
  "/register",
  rateLimitMiddleware(15 * 60 * 1000, 20),
  validateRegister,
  register,
);
router.post(
  "/login",
  rateLimitMiddleware(15 * 60 * 1000, 20),
  validateLogin,
  login,
);

router.get("/profile", auth, getProfile);
router.put("/complete-profile/:id", auth, isProfileOwner, completeUser);
router.patch("/edit-my-profile/:id", auth, isProfileOwner, updateUser);

router.patch(
  "/edit-user-profile/:id",
  auth,
  role(["admin", "superadmin"]),
  updateUser,
);

router.get("/get-list", auth, role(["admin", "superadmin"]), getAllUsers);
router.get(
  "/get-detail/:id",
  auth,
  role(["admin", "superadmin"]),
  getUserDetail,
);

router.delete("/delete/:id", auth, role(["admin", "superadmin"]), deleteUser);

router.patch("/change-role/:id", auth, role(["superadmin"]), changeUserRole);

router.post("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);

module.exports = router;
