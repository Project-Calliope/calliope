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

app.get("/api", (req, res) => {
  res.send(`${process.env.JWT_TOKEN}`);
});

const audioRoutes = require("./routes/audio.routes");
app.use("/api/audio", audioRoutes);

app.listen(port, () => {
  console.log(`Calliope Backend listening on port ${port}`);
});

// App setup
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI at /api/docs
