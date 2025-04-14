const swaggerJSDoc = require("swagger-jsdoc");

// Swagger documentation
const swaggerDefinition = {
  openapi: "3.0.0", // OpenAPI version
  info: {
    title: "Calliope Backend API",
    version: "1.0.0",
    description: "API for Calliope Backend",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./swagger_doc/*.swagger.js"], // Path to the API route documentation files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
