const express = require("express");
const router = express.Router();

/**
 * RessourceController is responsible for handling the logic related to resources.
 * It connects the routes to the appropriate controller methods that manage
 * resource-related operations such as creating, reading, updating, and deleting resources.
 *
 * @module RessourceController
 */
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

router.post("/note", JWTController.verifyToken, RessourceController.createNote);

router.put("/note", JWTController.verifyToken, RessourceController.updateNote);

module.exports = router;
