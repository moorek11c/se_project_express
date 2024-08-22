const { ERROR_CODES, ERROR_MESSAGES } = require("../errors");

class BadRequestError extends Error {
  constructor(message = ERROR_MESSAGES.INVALID_DATA) {
    super(message);
    this.statusCode = ERROR_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
