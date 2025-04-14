const pool = require("../config/pg.config");

class Transcript {
  static async get_transcript(public_ressource_id, public_user_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_transcript($1 ,$2)`, [
        public_ressource_id,
        public_user_id,
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
