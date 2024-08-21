const ClothingItem = require("../models/clothingItem");

// get all clothing items

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find({});
    res.status(200).send(items);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, imageUrl, weather } = req.body;

    const item = await ClothingItem.create({ name, imageUrl, weather });
    return res.status(201).send(item);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { _id } = req.params;

    const item = await ClothingItem.findByIdAndDelete(_id);

    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    return res.status(200).delete(item);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { getItems, createItem, deleteItem };
