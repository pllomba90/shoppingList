const express = require('express');
const app = express();
const routes = require("./routes")

app.use(express.json());

app.use("/items", routes)

app.listen(3000, function () {
    console.log('App on port 3000');
  })