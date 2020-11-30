const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const token_env = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = token_env;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
