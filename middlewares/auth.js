const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/errors");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// Middleware to check if the user is authenticated

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new CustomError(
      ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
      ERROR_CODES.UNAUTHORIZED
    );
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;
    return next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    throw new CustomError(
      ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
      ERROR_CODES.UNAUTHORIZED
    );
  }
};

module.exports = auth;
