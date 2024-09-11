const crypto = require("crypto");

const { JWT_SECRET = "this is a secret key" } = process.env;

module.exports = { JWT_SECRET };
