const express = require("express");
const accountAPI = express.Router();
const {
  checkAccountUser,
  checkAccountID,
} = require("../../middleware/checkAccountUser");
const {
  getDataAccountUser,
  postDataAccountUser,
  putDataAccountUser,
  deleteAccountUser,
} = require("../../controller/AccountController");

accountAPI.get("/", getDataAccountUser);
accountAPI.post("/", checkAccountUser, postDataAccountUser);
accountAPI.put("/update_id", putDataAccountUser);
accountAPI.delete("/delete_id", deleteAccountUser);

module.exports = accountAPI;
