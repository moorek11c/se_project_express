const express = require("express");
const auth = require("../middlewares/auth");

const router = express.Router();
const likesController = require("../controllers/likes");

// Like an item
router.put("/:itemId/likes", auth, likesController.putLikes);

// DELETE a like
router.delete("/:itemId/likes", auth, likesController.deleteLikes);

module.exports = router;
