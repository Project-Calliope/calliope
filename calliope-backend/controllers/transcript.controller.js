const { Transcript } = require("../models/transcript.model");

exports.getById = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.query.ressource_id) {
    return res.status(400).json({
      success: false,
      message: "L'identifiant de la ressource est obligaoire",
    });
  }

  const result = await Transcript.get_transcript(
    req.query.ressource_id,
    public_user_id,
  );

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};
