// Runs before the test framework and before any application module is loaded.
require("dotenv").config();

process.env.DB_NAME = process.env.TEST_DB_NAME || "evangadi_forum_test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-not-used-in-production";
process.env.NODE_ENV = "test";
