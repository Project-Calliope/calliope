const pool = require("../config/pg.config");

class User {
  constructor(public_user_id, email, password) {
    this.public_user_id = public_user_id;
    this.email = email;
    this.password = password;
  }

  /**
   * Retrieves user information from the database based on the provided email.
   *
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the user information.
   */
  static async get(email) {
    try {
      const result = await pool.query(`SELECT * FROM get_user_public_id($1)`, [
        email,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          user: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "User does not exist",
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
   * Logs in a user by verifying their email and password.
   *
   * @param {string} email - The email address of the user attempting to log in.
   * @param {string} password - The password of the user attempting to log in.
   * @returns {Promise<Object>} A promise that resolves to an object containing:
   *   - `success` {boolean}: Indicates whether the login was successful.
   *   - `user` {Object} (optional): The user data if login is successful.
   *   - `message` {string} (optional): An error message if login fails.
   *   - `error` {string} (optional): The error message if an exception occurs.
   */
  static async login(email, password) {
    try {
      const result = await pool.query(`SELECT * FROM login_user($1, $2)`, [
        email,
        password,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          user: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "User does not exist",
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
   * Creates a new user in the database.
   *
   * @async
   * @param {string} username - The username of the new user.
   * @param {string} email - The email address of the new user.
   * @param {string} password - The password of the new user.
   * @returns {Promise<Object>} A promise that resolves to an object containing:
   *  - `success` {boolean}: Indicates whether the user creation was successful.
   *  - `user` {Object} (optional): The created user data if successful.
   * - `message` {string} (optional): An error message if user creation fails.
   *  - `error` {string} (optional): The error message if an exception occurs.
   */
  static async save(username, email, password) {
    try {
      const result = await pool.query(`SELECT * FROM create_user($1, $2, $3)`, [
        username,
        email,
        password,
      ]);
      return {
        success: true,
        user: result.rows[0],
      };
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        success: false,
        message: "Error creating user",
        error: error.message,
      };
    }
  }

  /**
   * Retrieves user information based on the provided public user ID.
   *
   * @async
   * @param {string} public_user_id - The public ID of the user to retrieve information for.
   * @returns {Promise<Object>} A promise that resolves to an object containing the success status,
   *                            user information if found, or an error message if not.
   *                            - If successful: { success: true, user: Object }
   *                            - If user does not exist: { success: false, message: string }
   *                            - If an error occurs: { success: false, message: string, error: string }
   */
  static async whoami(public_user_id) {
    try {
      const result = await pool.query(`SELECT * FROM get_user($1)`, [
        public_user_id,
      ]);
      if (result.rows.length > 0) {
        return {
          success: true,
          user: result.rows[0],
        };
      } else {
        return {
          success: false,
          message: "User does not exist",
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
}

exports.User = User;
