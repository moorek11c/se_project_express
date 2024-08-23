const { ERROR_CODES, ERROR_MESSAGES } = require("../errors");

class ServerError extends Error {
  constructor(message = ERROR_MESSAGES.SERVER_ERROR) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = ServerError;
