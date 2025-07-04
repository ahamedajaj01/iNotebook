const jwt = require("jsonwebtoken");
require("dotenv").config();

//  required to use JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const fetchUser = (req, res, next) => {
  // get the user from the jwt token  and id to req object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
