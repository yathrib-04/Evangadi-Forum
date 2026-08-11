require("dotenv").config();
const app = require("./app");
const dbconnection = require("./DB/dbConfig");

const port = process.env.PORT || 5000;

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
