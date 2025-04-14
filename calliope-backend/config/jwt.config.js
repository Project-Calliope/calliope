// Configuration object for JSON Web Token (JWT)
const jwtConfig = {
  // Secret key for signing the JWT, retrieved from environment variables
  secret: process.env.JWT_TOKEN,
  // Expiration time for the token, set to 1 day
  expiresIn: "1d",
};

// Export the configuration object
module.exports = jwtConfig;
