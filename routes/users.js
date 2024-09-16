const router = require("express").Router();
const { celebrate } = require("celebrate");
const { validateId } = require("../middlewares/validationSchemas");

const userController = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  createUserSchema,
  loginUserSchema,
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
router.get("/users/me", auth, validateId, userController.getCurrentUser);

// update profile
router.patch("/users/me", auth, userController.updateUser);

module.exports = router;
