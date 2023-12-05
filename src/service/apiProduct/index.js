const express = require("express");
const {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require("../../controller/Product");
const { checkProduct } = require("../../middleware/checkProduct");
const routerProduct = express.Router();

routerProduct.get("/", getProduct);
routerProduct.post("/", postProduct);
routerProduct.put("/", updateProduct);
routerProduct.delete("/", deleteProduct);
routerProduct.delete("/search", searchProduct);

module.exports = routerProduct;
