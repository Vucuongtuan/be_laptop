// controllers/cartController.js
const { Cart, ProductLaptop, Mouse } = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, productType, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, productType, quantity: quantity || 1 });
    }
    await cart.save();
    return res.json(cart);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

const viewCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.json(cart);
  } catch (error) {
    console.error("Error viewing cart:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { addToCart, viewCart };
