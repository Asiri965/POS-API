const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");
const verifyToken = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res
          .status(403)
          .json({ message: "Access Denied, No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const user = User.findOne({ username: decoded.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (requiredRoles.length && requiredRoles.includes[user.roles]) {
        return res.status(403).json({ message: "You have no access here" });
      }

      next();
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token..." });
      } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired..." });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
module.exports = verifyToken;
