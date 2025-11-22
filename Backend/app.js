require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors =  require("cors");

// this tells the server to allow requests from any origin ot it is like it is okat for the requsets to comefrom any domain 
app.use(cors());

// DB connection
const dbconnection = require("./DB/dbConfig");

// Authentication middleware
const { authMiddleware } = require("./middleware/authMiddleware");


// JSON Middleware to parse request body
app.use(express.json());

// user Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


// Question routes
const questionRouter = require("./routes/questionRouter");
app.use("/api/questions", questionRouter);



// answer routes (protected by authMiddleware)
const answerRouter = require("./routes/answerRouter");
app.use("/api/answers", authMiddleware, answerRouter);

const { swaggerUi, swaggerDocs } = require("./swagger");

// Serve Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Async function to test DB connection and start server
async function testDB() {
  try {
    await dbconnection.execute("SELECT 'test' AS test_col");
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  } finally {
    
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}

testDB();