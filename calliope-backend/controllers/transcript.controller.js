const { Transcript } = require("../models/transcript.model");

exports.getById = async (req, res) => {
  const { public_user_id } = req.user;

  if (!req.query.ressource_id) {
    return res.status(400).json({
      success: false,
      message: "L'identifiant de la ressource est obligaoire",
    });
  }

  /**
   * Retrieves a transcript based on the provided resource ID and public user ID.
   *
   * @param {string} req.query.ressource_id - The ID of the resource for which the transcript is being retrieved.
   * @param {string} public_user_id - The public user ID associated with the request.
   * @returns {Promise<Object>} The transcript data retrieved from the database.
   * @throws {Error} If there is an issue retrieving the transcript.
   */
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
