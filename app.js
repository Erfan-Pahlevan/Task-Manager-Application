require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users.routes");
const taskRoutes = require("./routes/tasks.routes");
const loggerMiddleware = require("./middlewares/logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimitMiddleware = require("./middlewares/rateLimit.middleware");

async function connectDB() {
  try {
    (await mongoose.connect("mongodb://127.0.0.1:27017/task-manager"),
      console.log("MongoDB connected"));
  } catch (err) {
    console.error(err);
  }
}

connectDB();

const app = express();

// middleware for parsing the body
app.use(express.json());

app.use(cors({ origin: "https://frontend.com" }));
app.use(rateLimitMiddleware());
app.use(helmet());
app.use(loggerMiddleware);

app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
