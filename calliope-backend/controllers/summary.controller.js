const { Summary } = require("../models/summary.model");

exports.getSummary = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.body.ressource_id) {
    return res.status(400).json({
      success: false,
      message: "Aucun identifiant de ressource fourni",
    });
  }

  const result = await Summary.get_summary(
    public_user_id,
    req.body.ressource_id,
  );
  if (result.success) {
    return res.status(200).json({
      success: true,
      summary: result.summary,
    });
  } else {
    return res.status(400).json(result);
  }
};

exports.createSummary = async (req, res) => {};
