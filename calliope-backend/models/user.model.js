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
}

exports.User = User;
