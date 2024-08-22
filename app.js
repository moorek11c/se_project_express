/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
const indexRoutes = require("./routes/index");
const { ERROR_CODES, ERROR_MESSAGES } = require("./utils/errors");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "66c66b60a929698be6fb3d7b",
  };
  next();
});

app.use("/", indexRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODES.SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.SERVER_ERROR;
  console.error(err.stack);
  res.status(statusCode).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
