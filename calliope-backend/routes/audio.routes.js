/**
 * @fileoverview Defines the routes for audio-related operations in the Calliope backend.
 * Handles audio file uploads, validation, transcription, and storage.
 */

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

/**
 * Middleware configuration for handling file uploads using Multer.
 * - Uses memory storage to avoid disk storage.
 * - Limits file size to 10 MB.
 * - Expects the file field to be named 'audio'.
 */

/**
 * POST /upload
 * Route for uploading an audio file.
 *
 * Middleware applied in sequence:
 * 1. `jwtMiddleware.verifyToken` - Verifies the user's JWT token for authentication.
 * 2. `upload` - Handles the file upload using Multer.
 * 3. `multerErrorHandler` - Handles any errors that occur during the file upload process.
 * 4. `validateAudio` - Validates the uploaded audio file.
 * 5. `CalliopeAIMiddleware.transcribe` - Transcribes the audio file using Calliope AI.
 * 6. `audioController.uploadAudio` - Handles the final processing and storage of the audio file.
 *
 * @name POST /upload
 * @function
 * @memberof module:routes/audio
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */

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
