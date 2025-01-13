const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controller/blogRouter");
const usersRouter = require("./controller/userRoutes");

const app = express();
mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

module.exports = app;
