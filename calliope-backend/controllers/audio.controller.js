// controllers/audio.controller.js

exports.uploadAudio = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!req.file.transcrible) {
    return res.status(200).json({
      success: true,
      response: {
        title: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        transcript: req.file.transcript,
      },
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Le transcription du fichier audio n'a pas abouti",
    });
  }
};
