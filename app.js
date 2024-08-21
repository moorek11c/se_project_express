/* eslint-disable no-console */
const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const indexRoutes = require("./routes/index");

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
