const express = require("express");
const audioController = require("../controllers/audio.controller");
const validateAudio = require("../middleware/validateAudio.middleware");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const router = express.Router();
const multer = require("multer");
const {
  multerErrorHandler,
} = require("../middleware/multerErrorHandler.middleware");
const CalliopeAIMiddleware = require("../middleware/calliopeAIMiddleware");

const storage = multer.memoryStorage(); // Utilisation de la mémoire pour éviter le stockage disque
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 Mo
}).single("audio"); // 'audio' correspond à la clé du champ du fichier

// Appliquer Multer avant la validation
router.post(
  "/upload",
  jwtMiddleware.verifyToken,
  upload,
  multerErrorHandler,
  validateAudio,
  CalliopeAIMiddleware.transcribe,
  audioController.uploadAudio,
);

module.exports = router;
