const router = require("express").Router();
const clothingController = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// find all items
router.get("/", clothingController.getItems);

// create a new item
router.post("/", auth, clothingController.createItem);

// delete a item
router.delete("/:itemId", auth, clothingController.deleteItem);

module.exports = router;
