const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: [2, "The name field must be at least 2 characters long"],
    maxlength: [30, "The name field must be at most 30 characters long"],
  },
  weather: {
    required: [true, "The weather field is required"],
    type: String,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    required: [true, "The imageUrl field is required"],
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value, {
          protocols: ["http", "https"],
          require_protocol: true,
        });
      },
      message: "Invalid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);
