const express = require("express");
const taxonomy = require("../routes/taxonomy");
const cors = require("cors");
const registerUsers = require("../routes/registerUsers");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(cors({ origin: "*" }));
  app.use("/api", taxonomy);
  app.use("/api/registerusers", registerUsers);
  app.use("/api/auth", auth);
  app.use(error);
};
