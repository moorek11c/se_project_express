require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

const indexRoutes = require("./routes/index");

const {
  errorHandler,
  ERROR_CODES,
  ERROR_MESSAGES,
  CustomError,
} = require("./utils/errors");

const { requestLogger, errorLogger } = require("./middlewares/logger");

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
app.use(cors());

app.use(requestLogger);

app.use("/", indexRoutes);

app.use((req, res, next) => {
  next(new CustomError(ERROR_MESSAGES.INVALID_ROUTER, ERROR_CODES.NOT_FOUND));
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
