const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
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
