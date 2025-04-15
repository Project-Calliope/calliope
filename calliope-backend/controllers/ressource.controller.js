const { Ressource } = require("../models/ressource.model");

exports.getArborescence = async (req, res) => {
  const { public_user_id } = req.user;

  /**
   * Retrieves the root resource associated with the given public user ID.
   *
   * @type {Object} root_ressource - The root resource object.
   */
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

  /**
   * Retrieves a note associated with a specific resource and user.
   *
   * @async
   * @function
   * @param {string} public_user_id - The public identifier of the user.
   * @param {Object} req - The request object.
   * @param {string} req.query.ressource_id - The identifier of the resource.
   * @returns {Promise<Object>} The result containing the note data.
   * @throws {Error} If an error occurs while fetching the note.
   */
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

  /**
   * Creates a new folder resource for the specified user.
   *
   * @param {string} public_user_id - The public ID of the user creating the folder.
   * @param {string} req.body.public_father_id - The public ID of the parent folder where the new folder will be created.
   * @param {string} req.body.ressource_name - The name of the new folder to be created.
   * @returns {Promise<Object>} A promise that resolves to the result of the folder creation operation.
   * @throws {Error} If the folder creation fails.
   */
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

exports.updateNote = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.body.ressource_id) {
    return res.status(400).json({
      success: false,
      message: "L'identifiant de la ressource à mettre à jour est obligatoire",
    });
  }

  if (!req.body.content) {
    return res.status(400).json({
      success: false,
      message: "Le nouveau contenu est obligatoire",
    });
  }

  /**
   * Updates the note for a specific resource.
   *
   * @async
   * @function
   * @param {string} public_user_id - The ID of the public user making the request.
   * @param {Object} req - The request object.
   * @param {string} req.body.ressource_id - The ID of the resource to update.
   * @param {string} req.body.content - The new content of the note.
   * @returns {Promise<Object>} The result of the update operation.
   */
  const result = await Ressource.update_note(
    public_user_id,
    req.body.ressource_id,
    req.body.content,
  );
  if (result.success) {
    return res.status(204).json(result);
  } else {
    return res.status(400).json(result);
  }
};

exports.createNote = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.body.ressource_name) {
    return res.status(400).json({
      success: false,
      message: "Nom de la note obligatoire",
    });
  }

  if (!req.body.ressource_father_id) {
    return res.status(400).json({
      success: false,
      message: "Identifiant de la ressource parente obligatoire",
    });
  }

  /**
   * Creates a new note resource associated with a public user.
   *
   * @async
   * @function
   * @param {string} public_user_id - The ID of the public user creating the note.
   * @param {Object} req.body - The request body containing the note details.
   * @param {string} req.body.ressource_father_id - The ID of the parent resource.
   * @param {string} req.body.ressource_name - The name of the new resource.
   * @returns {Promise<Object>} The result of the note creation operation.
   */
  const result = await Ressource.create_note(
    public_user_id,
    req.body.ressource_father_id,
    req.body.ressource_name,
  );
  if (result.success) {
    return res.status(201).json(result);
  } else {
    return res.status(400).json(result);
  }
};
