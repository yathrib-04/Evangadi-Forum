
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const dbconnection = require("./DB/dbConfig");

// Middleware to parse JSON
app.use(express.json());

// User routes
app.use("/api/users", userRoutes);

// Async function to test DB connection
async function testDB() {
  try {
    const result = await dbconnection.execute("SELECT 'test' AS test_col");
    await app.listen(port);
    console.log("Database connected successfully.");
    console.log('listening on port', port);
  } catch (error) {
    console.error( error.message);
  }
}

// Call DB test function
testDB();

