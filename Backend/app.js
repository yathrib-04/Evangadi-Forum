require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

// Fail fast on missing config rather than handing out unsigned/undecodable tokens.
const requiredEnv = ["DB_USER", "DB_NAME", "JWT_SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnv.join(", ")}\n` +
      "Copy Backend/.env.example to Backend/.env and fill it in."
  );
  process.exit(1);
}

// Allow the React dev server (and anything set in CORS_ORIGIN) to call the API.
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));

// DB connection
const dbconnection = require("./DB/dbConfig");

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

// Verify the DB is reachable before accepting traffic - the API is useless
// without it, so a failure here should stop the process, not be swallowed.
async function start() {
  try {
    await dbconnection.execute("SELECT 'test' AS test_col");
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
}

start();
