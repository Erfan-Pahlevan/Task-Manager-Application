const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");

const {
  checkAuthHeader,
  auth,
} = require("../middlewares/users/users.middleware");

const {
  register,
  login,
  getAll,
  getUserData,
  getUserById,
  getSearchResults,
  getProducts,
  getProductById,
  postUserData,
  getDetail,
  update,
  deleteOne,
  profile,
  uploadAvatar,
} = require("../controllers/users/users.controllers");

router.get("/", (req, res) => {
  res.send("<h1>users</h1>");
});

router.post("/register", register);
router.post("/login", login);

router.get("/get-all", getAll);
router.get("/get-detail/:id", getDetail);
router.put("/update", update);
router.delete("/delete", deleteOne);
router.get("/user", getUserData);

// route params:
router.get("/user/:id", getUserById);

router.get("/dashboard", auth);
router.get("/profile", auth, profile);
router.get("/admin", auth);
router.post("/dashboard", checkAuthHeader);

// Method using local middleware auth:

router.get("/products/:id", getProductById);
router.get("/products", getProducts);

router.get("/search", getSearchResults);
router.post("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);

module.exports = router;
