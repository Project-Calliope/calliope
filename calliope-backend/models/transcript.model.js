const pool = require("../config/pg.config");

/**
 * Retrieves a transcript based on the provided user and resource IDs.
 *
 * @async
 * @function
 * @param {string} public_user_id - The public ID of the user.
 * @param {string} public_ressource_id - The public ID of the resource.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 * - `success` (boolean): Indicates whether the operation was successful.
 * - `result` (Object|undefined): The transcript data if found.
 * - `message` (string|undefined): An error message if the operation failed.
 * - `error` (string|undefined): The error details if an exception occurred.
 */
class Transcript {
  static async get_transcript(public_user_id, public_ressource_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_transcript($1 ,$2)`, [
        public_user_id,
        public_ressource_id,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          result: result.rows[0],
        };
      } else {
        return {
          success: true,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error getting note transcript",
        error: error.message,
      };
    }
  }
}

exports.Transcript = Transcript;
