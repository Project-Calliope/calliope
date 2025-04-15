const { User } = require("../models/user.model");

/**
 * Middleware to validate the presence of email and password in the request body.
 * If either field is missing, it responds with a 400 status and an appropriate error message.
 * Otherwise, it passes control to the next middleware.
 *
 * @async
 * @function signin
 * @param {Object} req - The Express request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email provided by the user.
 * @param {string} req.body.password - The password provided by the user.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void} Sends a 400 response if validation fails, otherwise calls `next()`.
 */
const signin = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: "L'email est obligatoire",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Le mot de passe est obligatoire",
    });
  }
  next();
};

/**
 * Middleware function to validate user signup data.
 * Ensures that the required fields (email, password, and username) are present
 * and checks if the user already exists in the database.
 *
 * @async
 * @function signup
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user data.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.username - The username of the user.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {Object|void} Returns a JSON response with an error message if validation fails,
 * or calls the next middleware function if validation passes.
 */
const signup = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: "L'email est obligatoire",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Le mot de passe est obligatoire",
    });
  }

  if (!req.body.username) {
    return res.status(400).json({
      success: false,
      message: "Le nom d'utilisateur est obligatoire",
    });
  }

  const get_user = await User.get(req.body.email);
  if (get_user.success) {
    return res.status(400).json({
      success: false,
      message: "L'utilisateur existe déjà",
    });
  }
  next();
};

module.exports = {
  signin,
  signup,
};
