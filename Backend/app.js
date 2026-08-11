require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Allow the React dev server (and anything set in CORS_ORIGIN) to call the API.
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));

// JSON Middleware to parse request body
app.use(express.json());

// user Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Question routes (protected by authMiddleware)
const questionRouter = require("./routes/questionRouter");
app.use("/api/questions", questionRouter);

// answer routes (protected by authMiddleware)
const answerRouter = require("./routes/answerRouter");
app.use("/api/answers", answerRouter);

const { swaggerUi, swaggerDocs } = require("./swagger");

// Serve Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check - useful for deployment probes.
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Unknown API routes should 404 as JSON rather than fall through to Express's
// HTML error page.
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not Found", message: "No such endpoint" });
});

// This module only builds the app - see server.js for starting it. Keeping the
// two apart is what lets the test suite drive the app without binding a port.
module.exports = app;
