const express = require("express");
const router = express.Router();

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
  showWelcomeMsg,
  getProducts,
  getProductById,
  postUserData,
  getDetail,
  update,
  deleteOne,
  profile,
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

router.get("/dashboard", auth, showWelcomeMsg);
router.get("/profile", auth, profile);
router.get("/admin", auth, showWelcomeMsg);
router.post("/dashboard", checkAuthHeader, showWelcomeMsg);

// Method using local middleware auth:

router.get("/products/:id", getProductById);
router.get("/products", getProducts);

router.get("/search", getSearchResults);

module.exports = router;
