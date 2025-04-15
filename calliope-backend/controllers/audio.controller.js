// controllers/audio.controller.js

const { Ressource } = require("../models/ressource.model");

exports.uploadAudio = async (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Check if the file has a transcribable property
  if (!req.file.transcrible) {
    // Ensure a parent resource ID is provided
    if (!req.body.ressource_father_id) {
      return res.status(400).json({
        success: false,
        message: "No father ressource id provided",
      });
    } else {
      // Log relevant data for debugging
      console.log(
        req.user,
        req.body.ressource_father_id,
        req.file.originalname,
        req.file.transcript,
      );

      // Create a new resource with the transcript
      const create_result = await Ressource.create_note_with_transcript(
        req.user.public_user_id,
        req.body.ressource_father_id,
        req.file.originalname,
        req.file.transcript,
        req.file.originalname,
        req.file.size,
      );

      // Respond based on the success of the resource creation
      if (create_result.success) {
        return res.status(200).json(create_result);
      } else {
        return res.status(500).json({
          success: false,
          message: "L'enregistrement a échoué",
        });
      }
    }
  } else {
    // Handle case where the file transcription failed
    return res.status(500).json({
      success: false,
      message: "Le transcription du fichier audio n'a pas abouti",
    });
  }
};
