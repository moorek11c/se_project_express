const mongoose = require("mongoose");

const ClothingItem = require("../models/clothingItem");
const { CustomError, ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");

// get all clothing items

const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    res.status(200).send(items);
  } catch (error) {
    next(
      new CustomError(ERROR_MESSAGES.SERVER_ERROR, ERROR_CODES.SERVER_ERROR)
    );
  }
};

const createItem = async (req, res, next) => {
  const { name, imageUrl, weather } = req.body;
  const owner = req.user._id;
  try {
    const item = await ClothingItem.create({ name, imageUrl, weather, owner });
    return res.status(201).json(item);
  } catch (error) {
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      throw new CustomError(ERROR_MESSAGES.INVALID_ID, ERROR_CODES.BAD_REQUEST);
    }
    const item = await ClothingItem.findByIdAndDelete(itemId);
    if (!item) {
      throw new CustomError(
        ERROR_MESSAGES.ITEM_NOT_FOUND,
        ERROR_CODES.NOT_FOUND
      );
    }
    return res.status(200).json({ message: "Item successfully deleted" });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getItems, createItem, deleteItem };
