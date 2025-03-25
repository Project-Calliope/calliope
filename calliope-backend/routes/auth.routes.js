const express = require("express");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();
const UserMiddleware = require("../middleware/user.middleware");
const JwtMiddleware = require("../middleware/jwtMiddleware");

router.post("/signup", UserMiddleware.signup, AuthController.signup);
router.post("/signin", UserMiddleware.signin, AuthController.signin);
router.get("/whoami", JwtMiddleware.verifyToken, AuthController.whoami);
router.post("/logout", JwtMiddleware.invalidateToken);

module.exports = router;
