const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");
const invalidToken = [];

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. No token provided.",
    });
  }

  if (invalidToken.includes(token)) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
    req.user = decoded; // Attach decoded user data to request
    next();
  });
};
