const mongoose = require("mongoose");
const validator = require("validator");

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
});

module.exports = mongoose.model("User", userSchema);
