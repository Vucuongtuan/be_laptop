const express = require("express");
const getAllProduct = require("../../controller/AllProductController");
const routerAllProduct = express.Router();

routerAllProduct.get("/all-product", getAllProduct);

module.exports = routerAllProduct;
