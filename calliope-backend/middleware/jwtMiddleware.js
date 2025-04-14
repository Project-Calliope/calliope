const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt.config");
const invalidToken = [];

exports.verifyToken = (req, res, next) => {
  /**
   * Extracts the JWT token from the Authorization header of the request.
   * The header is expected to follow the format: "Bearer <token>".
   *
   * @type {string | undefined} token - The extracted JWT token, or undefined if the header is missing or improperly formatted.
   */
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

exports.invalidateToken = (req, res) => {
  /**
   * Extracts the JWT token from the Authorization header in the request.
   * The header is expected to follow the format: "Bearer <token>".
   *
   * @type {string | undefined} token - The extracted JWT token, or undefined if the header is missing or improperly formatted.
   */
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token
  invalidToken.push(token);
  res.status(200).json({
    success: true,
    message: "Token invalidated.",
  });
};
