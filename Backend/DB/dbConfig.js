const mysql2 = require("mysql2");
require("dotenv").config();

// NOTE: use DB_-prefixed names. `process.env.USER` is a shell built-in on
// Linux/macOS and would silently override whatever is set in .env.
const dbconnection = mysql2.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

module.exports = dbconnection.promise();
