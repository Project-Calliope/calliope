// middleware/validateAudio.js

module.exports = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier reçu" });
  }

  // Vérification du type MIME (exemple : audio/mp3, audio/wav)
  /**
   * An array of allowed MIME types for audio files.
   * These MIME types are used to validate the format of uploaded audio files.
   *
   * Supported MIME types include:
   * - "audio/mpeg": MPEG audio files
   * - "audio/wav": WAV audio files
   * - "audio/mp3": MP3 audio files
   * - "audio/x-wav": WAV audio files with "x-" prefix
   * - "audio/m4a": M4A audio files
   * - "audio/wave": Alternate MIME type for WAV audio files
   */
  const allowedMimeTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/mp3",
    "audio/x-wav",
    "audio/m4a",
    "audio/wave",
  ];

  console.log(req.file.mimetype);
  console.log(req.file.mimetype);
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      message: "Le fichier doit être un fichier audio (MP3, WAV, M4A, MPEG).",
    });
  }

  // Vérification de la taille du fichier (par exemple, 10 Mo)
  const maxSize = 10 * 1024 * 1024; // 10 Mo en octets
  if (req.file.size > maxSize) {
    return res.status(400).json({
      message:
        "Le fichier est trop volumineux. La taille maximale est de 10 Mo.",
    });
  }

  next();
};
