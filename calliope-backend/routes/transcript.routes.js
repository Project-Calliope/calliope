const express = require("express");
const router = express.Router();

const TranscriptController = require("../controllers/transcript.controller");
const JWTController = require("../middleware/jwtMiddleware");

router.get("/id", JWTController.verifyToken, TranscriptController.getById);

module.exports = router;
