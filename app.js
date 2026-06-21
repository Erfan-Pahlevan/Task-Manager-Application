require("dotenv").config();
const express = require("express");
const { auth } = require("./middlewares/users/users.middleware");
const { auth } = require("./middlewares/users/users.middleware");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

async function connectDB() {
  try {
    (await mongoose.connect("mongodb://127.0.0.1:27017/shop"),
      console.log("connected"));
  } catch (err) {
    console.error(err);
  }
}

connectDB();

const app = express();

// middleware for parsing the body
app.use(express.json());

app.use(cors({ origin: "https://frontend.com" }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(helmet());
app.use(loggerMiddleware);

app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
