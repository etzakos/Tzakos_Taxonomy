const logger = require("./logging");
const mysql = require("mysql2");
const config = require("config");

var pool = mysql.createPool({
  connectionLimit: 5,
  host: config.get("dbHost"),
  user: config.get("dbUser"),
  password: config.get("dbPassword"),
  database: config.get("database_name"),
});

pool.getConnection(function (err) {
  if (err) {
    throw new Error("ERROR: " + err.message + err);
  }
  logger.info("Connected to MySQL server...");
});

module.exports = pool;
