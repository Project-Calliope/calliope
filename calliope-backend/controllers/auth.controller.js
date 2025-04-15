const jwtConfig = require("../config/jwt.config");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * Handles user signup.
 * Saves the user details to the database and generates a JWT token upon successful registration.
 *
 * @param {Object} req - The request object containing user details (username, email, password).
 * @param {Object} res - The response object used to send the result back to the client.
 */
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const result = await User.save(username, email, password);

  if (result.success) {
    console.log(result.user);
    /**
     * Generates a JSON Web Token (JWT) for the authenticated user.
     *
     * @constant {string} token - The generated JWT containing the user's public ID.
     * This token is signed using the application's secret key and has an expiration time.
     */
    const token = jwt.sign(
      {
        public_user_id: result.user.public_user_id,
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
    );
    result.token = `Bearer ${token}`;
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};

/**
 * Handles user signin.
 * Authenticates the user and generates a JWT token upon successful login.
 *
 * @param {Object} req - The request object containing user credentials (email, password).
 * @param {Object} res - The response object used to send the result back to the client.
 */
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.login(email, password);

  if (result.success) {
    /**
     * Generates a JSON Web Token (JWT) for the authenticated user.
     *
     * @constant {string} token - The generated JWT containing the user's public ID.
     */
    const token = jwt.sign(
      {
        public_user_id: result.user.public_user_id,
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
    );
    result.token = `Bearer ${token}`;
    return res.status(200).json(result);
  }
  return res.status(400).json(result);
};

/**
 * Retrieves information about the currently authenticated user.
 *
 * @param {Object} req - The request object containing the authenticated user's details.
 * @param {Object} res - The response object used to send the result back to the client.
 */
exports.whoami = async (req, res) => {
  const { public_user_id } = req.user;

  const result = await User.whoami(public_user_id);
  if (result.success) {
    return res.status(200).json(result);
  }
  result.message = "You are not logged in";
  return res.status(400).json(result);
};
