/**
 * Middleware to handle Multer errors.
 *
 * This middleware checks if the error is an instance of `multer.MulterError`.
 * If the error code is `LIMIT_FILE_SIZE`, it responds with a 400 status code
 * and a message indicating that the file exceeds the size limit of 10 MB.
 * Otherwise, it passes the error to the next middleware.
 *
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 */
const multer = require("multer");

// Middleware de gestion d'erreur Multer
exports.multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Le fichier dépasse la limite de 10 Mo." });
    }
  }
  next(err);
};
