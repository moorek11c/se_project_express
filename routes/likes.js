const express = require("express");

const router = express.Router();
const likesController = require("../controllers/likes");

// Like an item
router.put("/:itemId/likes", likesController.putLikes);

// DELETE a like
router.delete("/:itemId/likes", likesController.deleteLikes);

module.exports = router;
