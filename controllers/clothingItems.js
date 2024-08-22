const ClothingItem = require("../models/clothingItem");
const asyncHandler = require("../utils/asyncHandler");
const BadRequestError = require("../utils/errorTypes/BadRequestError");
const NotFoundError = require("../utils/errorTypes/NotFoundError");

// get all clothing items

const getItems = asyncHandler(async (req, res) => {
  const items = await ClothingItem.find({});

  res.status(200).send(items);
});

const createItem = asyncHandler(async (req, res, next) => {
  const { name, imageUrl, weather } = req.body;
  if (!name || !imageUrl || !weather) {
    return next(new BadRequestError());
  }

  // Add the owner field to the item being created
  const item = await ClothingItem.create({
    name,
    imageUrl,
    weather,
    // eslint-disable-next-line no-underscore-dangle
    owner: req.user._id,
  });

  return res.status(201).send(item);
});

const deleteItem = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  const item = await ClothingItem.findByIdAndDelete(_id);

  if (!item) {
    return next(new NotFoundError());
  }

  return res.status(200).send({ message: "Item deleted successfully" });
});

module.exports = { getItems, createItem, deleteItem };
