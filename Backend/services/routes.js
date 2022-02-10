const express = require("express");
const taxonomy = require("../routes/taxonomy");
const cors = require("cors");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors({ origin: "*" }));
  app.use("/api", taxonomy);
  app.use(error);
};
