const express = require("express");
const auth = require("../middlewares/auth");
const { validateId } = require("../middlewares/validationSchemas");

const router = express.Router();
const likesController = require("../controllers/likes");

// Like an item
router.put("/:itemId/likes", auth, validateId, likesController.putLikes);

// DELETE a like
router.delete("/:itemId/likes", auth, validateId, likesController.deleteLikes);

module.exports = router;
