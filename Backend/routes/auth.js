const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const pool = require("../services/dbService");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;

  sqlCheckIfRegistered = `select id, userName, active, password, role from Users where userName = ?`;

  // Check if User is already registered
  pool.query(
    sqlCheckIfRegistered,
    [userName],
    async (error, results, fields) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      // Check if User name exists
      if (results && results.length === 0)
        return res.status(400).send("User name or password incorrect");

      const {
        id,
        userName: userNameInDB,
        active: activeInDB,
        password: passwordInDB,
        role: roleInDB,
      } = results[0];

      const validPassword = await bcrypt.compare(
        req.body.password,
        passwordInDB
      );

      // Check if Password is valid and the account is Active
      if (!validPassword || !activeInDB)
        return res.status(400).send("User name or password incorrect 2");

      const token = jwt.sign(
        { id: id, userName: userNameInDB, role: roleInDB },
        config.get("jwtPrivateKey")
      );

      //   return res.send("User name and password correct!  " + token);
      // Send JWT in Header
      // return res
      //   .header("x-auth-token", token)
      //   .send("Authentication Successful");
      return res.header("x-auth-token", token).send(token);
    }
  );
});

module.exports = router;
