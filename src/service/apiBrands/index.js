const express = require("express");
const routerBrands = express.Router();

routerBrands.get("/", getBrands);
routerBrands.post("/", postBrands);
routerBrands.put("/id", updateBrands);
routerBrands.delete("/id", deleteBrands);

module.exports = routerBrands;
