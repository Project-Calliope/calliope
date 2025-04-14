const pool = require("../config/pg.config");

class Summary {
  static async get_summary(public_user_id, public_ressource_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_summary($1, $2)`, [
        public_ressource_id,
        public_user_id,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          summary: result.rows[0],
        };
      } else {
        return {
          success: true,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Le résumé n'a pas pu être chargé",
        error: error.message,
      };
    }
  }

  static async create_summary(public_ressource_id, public_user_id, summary) {
    try {
      const result = await pool.query(
        `SELECT * FROM create_summary($1, $2, $3)`,
        [public_ressource_id, public_user_id, summary],
      );
      if (result.rows.length > 0) {
        return {
          success: true,
          summary: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "Le résumé n'a pas pu être créé",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Le résumé n'a pas pu être créé",
        error: error.message,
      };
    }
  }
}

exports.Summary = Summary;
