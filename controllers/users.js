const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const BadRequestError = require("../utils/errorTypes/BadRequestError");
const NotFoundError = require("../utils/errorTypes/NotFoundError");
const { ERROR_MESSAGES } = require("../utils/errors");

// get all /users

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
});

// get /user by id

const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const user = await User.findById(_id).orFail(
    new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND)
  );

  return res.status(200).send(user);
});

// create a user

const createUser = asyncHandler(async (req, res, next) => {
  const { name, avatar } = req.body;

  if (!name || name.length < 2) {
    return next(new BadRequestError());
  }

  if (!avatar || avatar.length > 30) {
    return next(new BadRequestError());
  }

  const user = await User.create({ name, avatar });

  return res.status(201).send(user);
});
module.exports = { getUsers, createUser, getUser };
