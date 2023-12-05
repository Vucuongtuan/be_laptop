const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Cuong",
    },
    {
      id: 2,
      name: "Cuong_1",
    },
  ]);
});

app.listen(function () {
  console.log("====================================");
  console.log("Run server on port ");
  console.log("====================================");
});
