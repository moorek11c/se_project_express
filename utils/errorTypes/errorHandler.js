const { ERROR_CODES, ERROR_MESSAGES } = require("../errors");

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    err.statusCode = 400;
  }
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = "Invalid ID provided.";
  }
  const statusCode = err.statusCode || ERROR_CODES.SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.SERVER_ERROR;
  console.error(err.stack);
  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
