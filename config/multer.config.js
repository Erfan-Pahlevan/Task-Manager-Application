const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir, { recursive: true })) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 6 * 1024 * 1024, // 6MB
  },
});

module.exports = upload;
