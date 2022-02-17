const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  const token = req.headers["x-auth-token"];

  // Get JWT Payload
  const obj = jwt.decode(token);
  const role = obj.role;

  if (role === "RW") return next();

  return res.status(403).send("Access denied");
};
