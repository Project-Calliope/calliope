const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const UserMiddleware = require("../middleware/user.middleware");

router.post("/signup", UserMiddleware.signup, authController.signup);

module.exports = router;
