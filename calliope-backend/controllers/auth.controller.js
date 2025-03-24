const pool = require("../config/pg.config");

exports.signup = async (req, res) => {
  console.log(req.body);
  // Vérifier les données de la requête
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

  // Vérifier si l'utilisateur existe déjà
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM get_user('1079e772-072e-45b4-a8b4-f19ad7b146c0')`,
    );
    if (result.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "L'utilisateur existe déjà",
      });
    }
    const result2 = await client.query(
      `SELECT * FROM create_user('${req.body.username}', '${req.body.email}', '${req.body.password}')`,
    );
    return res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      user: result2.rows[0],
    });
  } catch (error) {
    console.error("Erreur de vérification de l'utilisateur:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur de vérification de l'utilisateur",
      error: error.message,
    });
  } finally {
    client.release();
  }
};
