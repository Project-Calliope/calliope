const calliopeAiAPI = require("../config/ai.config");
const { Summary } = require("../models/summary.model");
const { Transcript } = require("../models/transcript.model");

exports.getSummary = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.query.ressource_id) {
    return res.status(400).json({
      success: false,
      message: "Aucun identifiant de ressource fourni",
    });
  }

  const result = await Summary.get_summary(
    req.query.ressource_id,
    public_user_id,
  );
  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

exports.createSummary = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.body.public_ressource_id) {
    return res.status(400).json({
      success: false,
      message: "Aucun identifiant de ressource fourni",
    });
  }

  console.log(req.body.public_ressource_id);

  const transcript = await Transcript.get_transcript(
    req.body.public_ressource_id,
    public_user_id,
  );

  console.log(transcript);

  if (!transcript.result) {
    return res.status(400).json({
      success: false,
      message: "Problème lors du chargement du transcript de la ressource",
    });
  }

  try {
    const summarize = await calliopeAiAPI.post("/api/summarize", {
      text: transcript.result.transcript_content,
    });
    try {
      await Summary.create_summary(
        req.body.public_ressource_id,
        public_user_id,
        summarize.data.summary,
      );
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        message: "Problème lors de la génération du résumé",
      });
    }
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Problème lors de la génération du résumé",
    });
  }
};
