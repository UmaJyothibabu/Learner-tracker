const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, "ictklt", (err, decoded) => {
    if (decoded && decoded.email) {
      req.body.role = decoded.role;

      next();
    } else {
      console.log("Inside else in auth");
      return res.json({ message: "Unauthorised user" });
    }
  });
};
module.exports = auth;
