require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

    // db connection
const dbconnection = require("./DB/dbConfig");

// json Middleware to parse or extract json data from request body
app.use(express.json());

// user Routes middleware file
const userRoutes = require("./routes/userRoutes");

// questions middleware file
const questionsRouter = require("./routes/questionRouter");
// authentication middleware  
const {authMiddleware}  = require("./middleware/authMiddleware");

// User routes
app.use("/api/users", userRoutes);
app.use("/api/questions",authMiddleware, questionsRouter);

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

