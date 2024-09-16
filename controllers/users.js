const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const { CustomError, ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  // checks existing email

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
        ERROR_CODES.RESOURCE_EXISTS
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

    console.log("Saved User:", user); // Debug: Log saved user

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.json(userWithoutPassword);
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
    console.log("Email:", email, "Password:", password); // Ensure values are received

    const user = await User.findUserByCredentials(email, password);

    console.log("Found user:", user); // Log the user data

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Include user data in the response
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof CustomError) {
      return next(error);
    }

    return next(
      new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        ERROR_CODES.UNAUTHORIZED
      )
    );
  }
};

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).populate("clothingItems");

    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;

  try {
    if (!mongoose.isValidObjectId(_id)) {
      throw new CustomError(ERROR_MESSAGES.INVALID_ID, ERROR_CODES.BAD_REQUEST);
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  logIn,
  getCurrentUser,
  updateUser,
};
