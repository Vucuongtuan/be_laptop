const express = require("express");
const routerAllProduct = express.Router();

routerAllProduct.get("/all-product", getAllProduct);

module.exports = routerAllProduct;
