const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password
) {
  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error("Incorrect email or password");
    }

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = mongoose.model("User", userSchema);
