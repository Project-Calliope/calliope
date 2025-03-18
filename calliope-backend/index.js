// Import Express and set up the server
const express = require("express");
const cors = require("cors");

const app = express(); // Create an Express app
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Enable JSON parsing for all requests

const port = 5000;

// Import for Swagger (Documentation)
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");

// Import library for dotenv
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Calliope Backend is running!");
});

app.get("/test/env", (req, res) => {
  res.send(`${process.env.ENV}`);
});

// DB Test connection
const pool = require("./config/pg.config");
app.get("/test/db", async (req, res) => {
  try {
    const client = await pool.connect();

    // Exécuter une requête pour récupérer l'heure, l'utilisateur connecté et la base de données
    const result = await client.query(`
      SELECT NOW() AS current_time, 
             current_user AS connected_user, 
             current_database() AS connected_database;
    `);

    client.release();

    res.json({
      success: true,
      message: "Connexion à la base de données réussie",
      serverTime: result.rows[0].current_time,
      connectedUser: result.rows[0].connected_user,
      connectedDatabase: result.rows[0].connected_database,
    });
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    res.status(500).json({
      success: false,
      message: "Erreur de connexion à la base de données",
      error: error.message,
    });
  }
});

const audioRoutes = require("./routes/audio.routes");
app.use("/api/audio", audioRoutes);

app.listen(port, () => {
  console.log(`Calliope Backend listening on port ${port}`);
});

// App setup
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI at /api/docs
