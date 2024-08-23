const router = require("express").Router();
const clothingController = require("../controllers/clothingItems");

// find all items
router.get("/", clothingController.getItems);

// create a new item
router.post("/", clothingController.createItem);

// delete a item
router.delete("/:itemId", clothingController.deleteItem);

module.exports = router;
