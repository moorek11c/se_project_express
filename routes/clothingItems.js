const router = require("express").Router();
const clothingController = require("../controllers/clothingItems");

// find all items
router.get("/", clothingController.getItems);

// create a new item
router.post("/", clothingController.createItem);

// delete a item
router.delete("/:id", clothingController.deleteItem);

module.exports = router;
