const express = require("express");
const {
  getDataMouse,
  postDataMouse,
  updateDataMouse,
  deleteDataMouse,
  searchDataMouse,
} = require("../../controller/Mouse");
const routerMouse = express.Router();

routerMouse.get("/", getDataMouse);
routerMouse.post("/", postDataMouse);
routerMouse.put("/update_id", updateDataMouse);
routerMouse.delete("/delete_id", deleteDataMouse);
routerMouse.get("/search", searchDataMouse);

module.exports = routerMouse;
