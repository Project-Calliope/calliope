const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Calliope Backend API',
        version: '1.0.0',
        description: 'API for Calliope Backend',
    },
};

const options = {
    swaggerDefinition,
    apis: ['./swagger_doc/*.swagger.js'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;