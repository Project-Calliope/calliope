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

  static async create_note_with_transcript(
    public_user_id,
    public_father_ressource_id,
    ressource_name,
    content,
    audioname,
    audiosize,
  ) {
    try {
      const result = await pool.query(
        `SELECT * FROM create_note_with_transcript($1, $2, $3, $4, $5, $6)`,
        [
          public_user_id,
          public_father_ressource_id,
          ressource_name,
          content,
          audioname,
          audiosize,
        ],
      );
      if (result.rows.length > 0) {
        return {
          success: true,
          public_ressource_id: result.rows[0].create_note_with_transcript,
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

  static async get_note(public_user_id, public_ressource_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_note($1, $2)`, [
        public_user_id,
        public_ressource_id,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          note: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "La note n'a pas pu être chargé",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "La note n'a pas pu être chargé",
        error: error.message,
      };
    }
  }

  static async create_folder(
    public_user_id,
    public_father_ressource_id,
    folder_name,
  ) {
    try {
      const result = await pool.query(
        `SELECT * FROM create_folder($1, $2, $3)`,
        [public_user_id, public_father_ressource_id, folder_name],
      );
      if (result.rows.length > 0) {
        return {
          success: true,
          public_ressource_id: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "Le dossier n'a pas pu être créé",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "le dossier n'a pas pu être créé",
        error: error.message,
      };
    }
  }

  static async update_note(
    public_user_id,
    public_ressource_id,
    updated_content,
  ) {
    try {
      await pool.query(`SELECT * FROM update_note($1, $2, $3)`, [
        public_user_id,
        public_ressource_id,
        updated_content,
      ]);
      return {
        success: true,
        message: "Note mise à jour",
      };
    } catch (error) {
      return {
        success: false,
        message: "La note n'a pas pu être sauvegardée",
        error: error.message,
      };
    }
  }
}

exports.Ressource = Ressource;
