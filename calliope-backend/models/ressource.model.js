const pool = require("../config/pg.config");

class Ressource {
  static async get_root_ressource(public_user_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_root_ressource($1)`, [
        public_user_id,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          result: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "The user does not have a root folder",
        };
      }
    } catch (error) {
      console.error("Error getting user information:", error);
      return {
        success: false,
        message: "Error getting user information",
        error: error.message,
      };
    }
  }

  static async get_arborescence(public_user_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_arborescence($1)`, [
        public_user_id,
      ]);

      return {
        success: true,
        result: result.rows,
      };
    } catch (error) {
      console.error("Error getting user information:", error);
      return {
        success: false,
        message: "Error getting user information",
        error: error.message,
      };
    }
  }

  static async create_note(
    public_user_id,
    public_father_ressource_id,
    ressource_name,
    content,
  ) {
    try {
      const result = await pool.query(
        `SELECT * FROM create_note($1, $2, $3, $4)`,
        [public_user_id, public_father_ressource_id, ressource_name, content],
      );
      if (result.rows.length > 0) {
        return {
          success: true,
          public_ressource_id: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "Issue while creating ressource",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Issue while creating ressource",
        error: error.message,
      };
    }
  }
}

exports.Ressource = Ressource;
