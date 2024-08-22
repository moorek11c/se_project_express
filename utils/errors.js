const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  SERVER_ERROR: "An error has occurred on the server.",
  ITEM_NOT_FOUND: "No item found with the given ID.",
  USER_NOT_FOUND: "No user found with the given ID.",
  INVALID_DATA: "Invalid data provided.",
  INVALID_ID: "Invalid ID provided.",
};

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
};
