const joi = require("joi");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri"); // or another custom error
};

const createItemSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  imageUrl: joi.string().custom(validateURL).required(),
  weather: joi.string().required(),
});

const createUserSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  avatar: joi.string().custom(validateURL).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = {
  createItemSchema,
  createUserSchema,
  loginUserSchema,
};
