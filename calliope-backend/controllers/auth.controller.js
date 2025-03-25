const jwtConfig = require("../config/jwt.config");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const result = await User.save(username, email, password);

  if (result.success) {
    console.log(result.user);
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

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.login(email, password);

  if (result.success) {
    const token = jwt.sign(
      {
        public_user_id: result.user.public_user_id,
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
    );
    result.token = `Bearer ${token}`;
    res.status(200).json(result);
  }
  res.status(400).json(result);
};
