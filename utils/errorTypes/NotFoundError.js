const { ERROR_CODES, ERROR_MESSAGES } = require("../errors");

class NotFoundError extends Error {
  constructor(
    message = ERROR_MESSAGES.ITEM_NOT_FOUND || ERROR_MESSAGES.USER_NOT_FOUND
  ) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
