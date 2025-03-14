const multer = require('multer');

// Middleware de gestion d'erreur Multer
exports.multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ message: 'Le fichier dépasse la limite de 10 Mo.' });
    }
  }
  next(err);
};
