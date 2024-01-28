const express = require("express");
const accountAPI = express.Router();
const {
  checkAccountUser,
  checkAccountID,
} = require("../../middleware/checkAccountUser");
const {
  getDataAccountUser,
  getDataByIDAccountUser,
  postDataAccountUser,
  putDataAccountUser,
  deleteAccountUser,
  loginAccountApp,
} = require("../../controller/AccountController");

accountAPI.get("/", getDataAccountUser);
accountAPI.get("/query", getDataByIDAccountUser);
accountAPI.post("/", checkAccountUser, postDataAccountUser);
accountAPI.put("/update_id", putDataAccountUser);
accountAPI.delete("/delete_id", deleteAccountUser);

accountAPI.post("/signin", loginAccountApp);

module.exports = accountAPI;
