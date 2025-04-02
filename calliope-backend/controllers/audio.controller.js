// controllers/audio.controller.js

const { Ressource } = require("../models/ressource.model");

exports.uploadAudio = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!req.file.transcrible) {
    // Création de la ressource en base de données

    if (!req.body.ressource_father_id) {
      return res.status(400).json({
        success: false,
        message: "No father ressource id provided",
      });
    } else {
      console.log(
        req.user,
        req.body.ressource_father_id,
        req.file.originalname,
        req.file.transcript,
      );
      const create_result = await Ressource.create_note_with_transcript(
        req.user.public_user_id,
        req.body.ressource_father_id,
        req.file.originalname,
        req.file.transcript,
        req.file.originalname,
        req.file.size,
      );

      if (create_result.success) {
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
          message: "L'enregistrement a échoué",
        });
      }
    }
  } else {
    return res.status(500).json({
      success: false,
      message: "Le transcription du fichier audio n'a pas abouti",
    });
  }
};
