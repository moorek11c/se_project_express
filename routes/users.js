const router = require("express").Router();
const userController = require("../controllers/users");
const auth = require("../middlewares/auth");

// sign-In
router.post("/signin", userController.logIn);

// sign-Up
router.post("/signup", userController.createUser);

// get current user
router.get("/users/me", auth, userController.getCurrentUser);

// update profile
router.patch("/users/me", auth, userController.updateUser);

module.exports = router;
