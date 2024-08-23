const router = require("express").Router();
const userRoutes = require("./users");
const clothingRoutes = require("./clothingItems");
const likesRoutes = require("./likes");

// user

router.use("/users", userRoutes);

// Clothing

router.use("/items", clothingRoutes);

// Likes
router.use("/items", likesRoutes);

module.exports = router;
