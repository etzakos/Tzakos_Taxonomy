const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const pool = require("../services/dbService");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { realName, userName, password } = req.body;

  sqlCheckIfRegistered = `select userName from Users where userName = ?`;
  sqlInsertNewUser = `insert into Users (realName, userName, active, password, role) values (?, ?, ?, ?, ?)`;

  pool.query(
    sqlCheckIfRegistered,
    [userName],
    async (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      if (results && results.length > 0) {
        return res.status(400).send("User already registered.");
      }

      // Insert new user in Database
      const active = 1;
      const role = "RO";
      console.log(sqlInsertNewUser);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      pool.query(
        sqlInsertNewUser,
        [realName, userName, active, hashedPassword, role],
        (error, results, fields) => {
          if (error) {
            return res.status(400).send(error.message);
          }

          // Pick up insertId for JWT
          const { insertId } = results;

          // Generate new JSON web token
          const token = jwt.sign(
            { id: insertId, userName: userName, role: role },
            config.get("jwtPrivateKey")
          );

          // Send JWT in Header
          return res
            .header("x-auth-token", token)
            .send("New user successfully registered");
        }
      );
    }
  );
});

module.exports = router;
