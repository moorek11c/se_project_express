const asyncHandler = require("../utils/asyncHandler");
const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../utils/errorTypes/NotFoundError");

// Like an item

const putLikes = asyncHandler(async (req, res) => {
  const item = await ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

  if (!item) {
    throw new NotFoundError();
  }

  res.status(200).send(item);
});

// Unlike an item

const deleteLikes = asyncHandler(async (req, res) => {
  const item = await ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );

  if (!item) {
    throw new NotFoundError();
  }

  res.status(200).send(item);
});

module.exports = { putLikes, deleteLikes };
