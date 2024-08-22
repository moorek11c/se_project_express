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

router.use((req, res) => {
  res.status(500).send({ message: "router not found" });
});

module.exports = router;
