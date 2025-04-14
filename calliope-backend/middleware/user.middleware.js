const { User } = require("../models/user.model");

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
