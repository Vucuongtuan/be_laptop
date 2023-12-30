const express = require("express");
const routerKeybourd = express.Router();
const {
  getKeybourd,
  postKeybourd,
  updateKeybourd,
  deleteKeybourd,
} = require("../../controller/Keybourd");
routerKeybourd.get("/", getKeybourd);
routerKeybourd.post("/", postKeybourd);
routerKeybourd.put("/id", updateKeybourd);
routerKeybourd.delete("/id", deleteKeybourd);

module.exports = routerKeybourd;
