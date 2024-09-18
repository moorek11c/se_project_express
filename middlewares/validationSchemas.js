const { celebrate, Joi } = require("celebrate");

const validator = require("validator");

// Validate URL using Joi custom validation

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri"); // or another custom error
};

// Validate IDs

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.hex": 'The "id" must be a valid hexadecimal string',
      "string.length": 'The "id" must be exactly 24 characters long',
      "any.required": 'The "id" field is required',
    }),
  }),
});

// Create Joi schema for item and user

const createItemSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  imageUrl: Joi.string().custom(validateURL).required(),
  weather: Joi.string().valid("hot", "warm", "cold").required(),
});

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  avatar: Joi.string().custom(validateURL).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  createItemSchema,
  createUserSchema,
  loginUserSchema,
  validateId,
};
