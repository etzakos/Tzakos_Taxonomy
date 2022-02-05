const logger = require("./logging");
const mysql = require("mysql2");

var pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  password: "1qaz@WSX",
  database: "Taxonomy_25Jan2022",
});

pool.getConnection(function (err) {
  if (err) {
    throw new Error("ERROR: " + err.message + err);
  }
  logger.info("Connected to MySQL server...");
});

module.exports = pool;
