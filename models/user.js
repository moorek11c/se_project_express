const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { CustomError } = require("../utils/errors");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "The name must be at least 2 characters long"],
    maxlength: [30, "The name must be at most 30 characters long"],
    required: true,
  },
  avatar: {
    required: [true, "The avatar field is required"],
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  try {
    const user = await this.findOne({ email }).select("+password");

    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      console.log("password not matched");
      throw new CustomError(
        ERROR_MESSAGES.NOT_AUTHORIZED_LOGIIN,
        ERROR_CODES.UNAUTHORIZED
      );
    }

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = mongoose.model("User", userSchema);
