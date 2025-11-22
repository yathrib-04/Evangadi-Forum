// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Evangadi Forum API",
      version: "1.0.0",
      description: "API documentation for the Evangadi Forum",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Tells Swagger it's using JWT tokens
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply security globally (to all routes that specify it)
      },
    ],
  },

  apis: [
    "./routes/userRoutes.js",
    "./routes/questionRouter.js",
    "./routes/answerRouter.js",
  ],
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
