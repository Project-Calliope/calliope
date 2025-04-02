const express = require("express");
const router = express.Router();

const RessourceController = require("../controllers/ressource.controller");
const JWTController = require("../middleware/jwtMiddleware");

router.get(
  "/arborescence",
  JWTController.verifyToken,
  RessourceController.getArborescence,
);

router.get("/note", JWTController.verifyToken, RessourceController.getNote);

router.post(
  "/folder",
  JWTController.verifyToken,
  RessourceController.createFolder,
);

module.exports = router;
