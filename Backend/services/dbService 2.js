const mysql = require("mysql2");

var pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  password: "1qaz@WSX",
  database: "taxonomy",
});

pool.getConnection(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

module.exports = pool;