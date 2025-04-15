const pool = require("../config/pg.config");

/**
 * The Ressource class provides methods to interact with resources in the database.
 * It includes functionality for retrieving, creating, and updating notes and folders,
 * as well as fetching hierarchical structures and root resources.
 */
class Ressource {
  /**
   * Retrieves the root resource (e.g., root folder) associated with a given public user ID.
   *
   * @async
   * @param {string} public_user_id - The public user ID for which to retrieve the root resource.
   * @returns {Promise<Object>} A promise that resolves to an object containing:
   *   - `success` {boolean}: Indicates whether the operation was successful.
   *   - `result` {Object} (optional): The root resource data if found.
   *   - `message` {string} (optional): A message describing the result or error.
   *   - `error` {string} (optional): The error message if an exception occurred.
   *
   * @throws {Error} If there is an issue querying the database.
   */
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

  /**
   * Retrieves the arborescence (hierarchical structure) for a given public user ID.
   *
   * @async
   * @param {string} public_user_id - The public user ID for which to retrieve the arborescence.
   * @returns {Promise<Object>} A promise that resolves to an object containing:
   *   - `success` {boolean}: Indicates whether the operation was successful.
   *   - `result` {Array|undefined}: The rows returned from the database query if successful.
   *   - `message` {string|undefined}: An error message if the operation failed.
   *   - `error` {string|undefined}: The error message from the caught exception, if any.
   * @throws {Error} If an unexpected error occurs during the database query.
   */
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

  /**
   * Creates a note with a transcript in the database.
   *
   * @async
   * @function create_note_with_transcript
   * @param {string} public_user_id - The public ID of the user creating the note.
   * @param {string} public_father_ressource_id - The public ID of the parent resource.
   * @param {string} ressource_name - The name of the resource to be created.
   * @param {string} content - The content of the note.
   * @param {string} audioname - The name of the associated audio file.
   * @param {number} audiosize - The size of the associated audio file in bytes.
   * @returns {Promise<Object>} A promise that resolves to an object containing:
   * - `success` {boolean}: Indicates whether the operation was successful.
   * - `public_ressource_id` {string} (optional): The public ID of the created resource (if successful).
   * - `message` {string} (optional): An error or success message.
   * - `error` {string} (optional): The error message if an exception occurred.
   */
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

  /**
   * Creates a new note resource in the database.
   *
   * @async
   * @function create_note
   * @param {string} public_user_id - The public ID of the user creating the note.
   * @param {string} public_father_ressource_id - The public ID of the parent resource.
   * @param {string} ressource_name - The name of the resource to be created.
   * @returns {Promise<Object>} A promise that resolves to an object containing the success status,
   *                            the public resource ID if successful, or an error message if not.
   * @throws {Error} If an error occurs during the database query.
   */
  static async create_note(
    public_user_id,
    public_father_ressource_id,
    ressource_name,
  ) {
    try {
      const result = await pool.query(`SELECT * FROM create_note($1, $2, $3)`, [
        public_user_id,
        public_father_ressource_id,
        ressource_name,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          public_ressource_id: result.rows[0].create_note,
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

  static async get_note(public_ressource_id, public_user_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_note($1, $2)`, [
        public_ressource_id,
        public_user_id,
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

  /**
   * Creates a new folder in the database.
   *
   * @async
   * @function
   * @param {string} public_user_id - The public ID of the user creating the folder.
   * @param {string} public_father_ressource_id - The public ID of the parent folder/resource.
   * @param {string} folder_name - The name of the folder to be created.
   * @returns {Promise<Object>} An object containing the success status and either the public resource ID of the created folder or an error message.
   * @throws {Error} If an error occurs during the database query.
   */
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

  /**
   * Updates a note in the database for a specific user and resource.
   *
   * @async
   * @function
   * @param {string} public_user_id - The public ID of the user.
   * @param {string} public_ressource_id - The public ID of the resource.
   * @param {string} updated_content - The updated content of the note.
   * @returns {Promise<Object>} An object containing the success status, a message,
   * and optionally an error message if the operation fails.
   */
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

  static async get_summary(public_user_id, public_ressource_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_summary($1, $2)`, [
        public_user_id,
        public_ressource_id,
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

exports.Ressource = Ressource;
