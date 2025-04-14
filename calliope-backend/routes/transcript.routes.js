const express = require("express");
const router = express.Router();

/**
 * Module responsible for handling transcript-related operations.
 * This controller is imported from the `transcript.controller` file
 * and provides methods to manage and process transcript data.
 */
const TranscriptController = require("../controllers/transcript.controller");
const JWTController = require("../middleware/jwtMiddleware");

router.get("/id", JWTController.verifyToken, TranscriptController.getById);

module.exports = router;
