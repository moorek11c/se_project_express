const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const { CustomError, ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

// get all /users

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    next(
      new CustomError(ERROR_MESSAGES.SERVER_ERROR, ERROR_CODES.SERVER_ERROR)
    );
  }
};

// get /user by id

const getUser = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!mongoose.isValidObjectId(_id)) {
      throw new CustomError(ERROR_MESSAGES.INVALID_ID, ERROR_CODES.BAD_REQUEST);
    }

    const user = await User.findById(_id);

    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUser:", error);
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  // checks existing email

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
        ERROR_CODES.BAD_REQUEST
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a User
    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

// log in controller
// gets email and password from request
// authenticates them
// uses User.findUserByCredintials()

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "7d" });

    return res.json({ token });
  } catch (error) {
    console.log(error);

    return next(error);
  }
};

module.exports = { getUsers, createUser, getUser, logIn };
