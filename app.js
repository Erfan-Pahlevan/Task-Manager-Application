require("dotenv").config();
const express = require("express");
const {
  checkAuthHeader,
  auth,
} = require("./middlewares/users/users.middleware");
const userRoutes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const mongoose = require("mongoose");

async function connectDB() {
  try {
    (await mongoose.connect("mongodb://127.0.0.1:27017/shop"),
      console.log("connected"));
  } catch {
    console.error(err);
  }
}

connectDB();

// Morgan middleware
// const morgan = require("morgan");
// app.use(morgan("tiny"));
const app = express();

// middleware for parsing the body
app.use(express.json());

app.use(loggerMiddleware);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
