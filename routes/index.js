const router = require("express").Router();
const userRoutes = require("./users");
const clothingRoutes = require("./clothingItems");

// user

router.use("/users", userRoutes);

// Clothing

router.use("/items", clothingRoutes);

router.use((req, res) => {
  res.status(500).send({ message: "router not found" });
});

module.exports = router;
