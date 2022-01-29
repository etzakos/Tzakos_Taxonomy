const mysql = require("mysql2");

var pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  password: "root",
  database: "taxonomy_new",
});

pool.getConnection(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

module.exports = pool;
