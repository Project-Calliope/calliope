const jwtConfig = {
  secret: process.env.JWT_TOKEN,
  expiresIn: "1d",
};

module.exports = jwtConfig;
