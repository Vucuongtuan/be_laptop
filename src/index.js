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
app.use("/api/account/", accountAPI);
app.use("/api/product_type/laptop/", routerProductType);
app.use("/api/product/laptop/", routerProduct);
app.use("/api/product_type/mouse/", routerMouseType);
app.use("/api/product/mouse/", routerMouse);

//run server
app.listen(function () {
  console.log("====================================");
  console.log("Run server on port ");
  console.log("====================================");
});
