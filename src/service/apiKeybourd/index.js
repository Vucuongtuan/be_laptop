const express = require("express");
const routerKeybourd = express.Router();
const {
  getKeybourd,
  postKeybourd,
  putKeybourd,
  deleteKeybourd,
} = require("../../controller/Keybourd");
routerKeybourd.get("/", getKeybourd);
routerKeybourd.post("/", postKeybourd);
routerKeybourd.put("/id", putKeybourd);
routerKeybourd.delete("/id", deleteKeybourd);

module.exports = routerKeybourd;
