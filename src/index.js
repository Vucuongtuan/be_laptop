const express = require("express");
const app = express();
const db = require("./config");
const accountAPI = require("./service/apiAccount/");
const routerProductType = require("./service/apiProductType/");
const bodyParser = require("body-parser");
const routerProduct = require("./service/apiProduct");
const path = require("path");
const routerMouseType = require("./service/apiMouseType");
const routerMouse = require("./service/apiMouse");
const cors = require("cors");
const routerQcBanner = require("./service/apiQcBanner");
const routerAllProduct = require("./service/apiAllProduct");
const routerBrands = require("./service/apiBrands");

app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  const data = {
    pageTitle: "Trang chủ",
    message: "Xin chào, đây là trang chủ!",
  };
  res.render("index", data);
});
//static file image
app.use(
  "/image/banner",
  express.static(path.join(__dirname, "./assets/image/banner"))
);
app.use(
  "/image/brands",
  express.static(path.join(__dirname, "./assets/image/brands"))
);
app.use(
  "/image/laptop/",
  express.static(path.join(__dirname, "./assets/image/laptop"))
);
app.use(
  "/image/mouse",
  express.static(path.join(__dirname, "./assets/image/mouse"))
);
app.use(
  "/image/keyboard",
  express.static(path.join(__dirname, "./assets/image/keyboard"))
);
//static file path
app.use(
  "/assets/brands/",
  express.static(path.join(__dirname, "./assets/brands"))
);
//config .env
require("dotenv").config();

app.use(express.json());
//static routes
app.use("/models/", express.static(path.join(__dirname, "./models/index.js")));

//create bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect db
db.connect();

//router
app.use("/account/", accountAPI);
app.use("/product_type/laptop/", routerProductType);
app.use("/product/laptop/", routerProduct);
app.use("/product_type/mouse/", routerMouseType);
app.use("/product/mouse/", routerMouse);
app.use("/banner/", routerQcBanner);
app.use("/all-product/", routerAllProduct);
app.use("/brands/", routerBrands);
//run server
app.listen(3000, function () {
  console.log("====================================");
  console.log("Run server on port ");
  console.log("====================================");
});
