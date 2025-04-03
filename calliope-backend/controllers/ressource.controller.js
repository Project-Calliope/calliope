const { Ressource } = require("../models/ressource.model");

exports.getArborescence = async (req, res) => {
  const { public_user_id } = req.user;

  const root_ressource = await Ressource.get_root_ressource(public_user_id);
  const arborescence = await Ressource.get_arborescence(public_user_id);

  if (root_ressource.success && arborescence.success) {
    return res.status(200).json({
      success: true,
      root: root_ressource.result,
      arborescence: arborescence.result,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Failed to retrieve the arborescence or root resource.",
    });
  }
};

exports.getNote = async (req, res) => {
  const { public_user_id } = req.user;

  console.log(public_user_id);

  if (!req.query.ressource_id) {
    return res.status(400).json({
      success: false,
      message: "Aucun identifiant de ressource fourni",
    });
  }

  const result = await Ressource.get_note(
    public_user_id,
    req.query.ressource_id,
  );
  if (result.success) {
    return res.status(200).json({
      success: true,
      note: result.note,
    });
  } else {
    return res.status(400).json(result);
  }
};

exports.createFolder = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.body.ressource_name) {
    return res.status(400).json({
      success: false,
      message: "Nom de la ressource obligatoire",
    });
  }

  if (!req.body.public_father_id) {
    return res.status(400).json({
      success: false,
      message: "Identifiant de la ressource parente obligatoire",
    });
  }

  const result = await Ressource.create_folder(
    public_user_id,
    req.body.public_father_id,
    req.body.ressource_name,
  );
  if (result.success) {
    return res.status(201).json(result);
  } else {
    return res.status(400).json(result);
  }
};
