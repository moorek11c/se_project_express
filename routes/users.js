const router = require("express").Router();
const userController = require("../controllers/users");

// find users
// router.get("/", userController.getUsers);

// find user by _id
// router.get("/:_id", userController.getUser);

// create user
// router.post("/", userController.createUser);

// sign-In
router.post("/signin", userController.logIn);

// sign-Up
router.post("/signup", userController.createUser);

module.exports = router;
