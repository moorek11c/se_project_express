const User = require("../models/user");

// get /users

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.params;

    // Await the result of the asynchronous operation
    const user = await User.findById(_id);

    if (!user) {
      // Handle case where user is not found
      return res.status(404).send({ message: "User not found" });
    }

    // Send the found user as the response
    return res.status(200).send(user);
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    console.log("Request Body:", req.body);

    // Create a new user using async/await
    const user = await User.create({ name, avatar });
    console.log("Created User:", user);

    // Send the created user as a response
    return res.status(201).send(user);
  } catch (err) {
    console.error(err);

    // Handle validation errors
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }

    // Handle other types of errors
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { getUsers, createUser, getUser };
