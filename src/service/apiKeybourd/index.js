const express = require("express");
const routerKeybourd = express.Router();
const {
  getKeybourd,
  postKeybourd,
  updateKeybourd,
  deleteKeybourd,
  getKeybourdById,
} = require("../../controller/Keybourd");
routerKeybourd.get("/", getKeybourd);
routerKeybourd.get("/query", getKeybourdById);
routerKeybourd.post("/", postKeybourd);
routerKeybourd.put("/id", updateKeybourd);
routerKeybourd.delete("/id", deleteKeybourd);

module.exports = routerKeybourd;
