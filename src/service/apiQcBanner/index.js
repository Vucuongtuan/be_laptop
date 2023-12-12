const express = require("express");
const routerQcBanner = express.Router();
const {
  getBannerQc,
  postBannerQc,
  updateBannerQc,
  deleteBannerQc,
} = require("../../controller/BannerQc");

routerQcBanner.get("/", getBannerQc);
routerQcBanner.post("/", postBannerQc);
routerQcBanner.put("/", updateBannerQc);
routerQcBanner.delete("/", deleteBannerQc);

module.exports = routerQcBanner;
