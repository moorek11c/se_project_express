const ClothingItem = require("../models/clothingItem");
const mongoose = require("mongoose");
const { CustomError, ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

// Like an item

const putLikes = async (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(
      new CustomError(ERROR_MESSAGES.INVALID_ID, ERROR_CODES.BAD_REQUEST)
    );
  }

  try {
    const item = await ClothingItem.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!item) {
      return next(
        new CustomError(ERROR_MESSAGES.ITEM_NOT_FOUND, ERROR_CODES.NOT_FOUND)
      );
    }

    return res.status(200).json(item);
  } catch (error) {
    return next(
      new CustomError(ERROR_MESSAGES.SERVER_ERROR, ERROR_CODES.SERVER_ERROR)
    );
  }
};

const deleteLikes = async (req, res, next) => {
  const { itemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(
      new CustomError(ERROR_MESSAGES.INVALID_ID, ERROR_CODES.BAD_REQUEST)
    );
  }

  try {
    const item = await ClothingItem.findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!item) {
      return next(
        new CustomError(ERROR_MESSAGES.ITEM_NOT_FOUND, ERROR_CODES.NOT_FOUND)
      );
    }

    return res.status(200).json(item);
  } catch (error) {
    return next(
      new CustomError(ERROR_MESSAGES.SERVER_ERROR, ERROR_CODES.SERVER_ERROR)
    );
  }
};

module.exports = { putLikes, deleteLikes };
