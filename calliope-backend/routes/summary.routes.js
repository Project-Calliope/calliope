const express = require("express");
const router = express.Router();

const SummaryController = require("../controllers/summary.controller");
const JWTController = require("../middleware/jwtMiddleware");

router.get("/id", JWTController.verifyToken, SummaryController.getSummary);
router.post(
  "/create",
  JWTController.verifyToken,
  SummaryController.createSummary,
);

module.exports = router;
