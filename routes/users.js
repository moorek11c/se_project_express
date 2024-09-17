const router = require("express").Router();
const { celebrate } = require("celebrate");

const userController = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  createUserSchema,
  loginUserSchema,
  editUserSchema,
} = require("../middlewares/validationSchemas");

// sign-In
router.post(
  "/signin",
  celebrate({ body: loginUserSchema }),
  userController.logIn
);

// sign-Up
router.post(
  "/signup",
  celebrate({ body: createUserSchema }),
  userController.createUser
);

// get current user
router.get("/users/me", auth, userController.getCurrentUser);

// update profile
router.patch(
  "/users/me",
  celebrate({ body: editUserSchema }),
  auth,
  userController.updateUser
);

module.exports = router;
