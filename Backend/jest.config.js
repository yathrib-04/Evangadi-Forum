module.exports = {
  testEnvironment: "node",
  // Point the app at the test database BEFORE any module reads process.env -
  // DB/dbConfig.js builds its pool at require time.
  setupFiles: ["<rootDir>/tests/env.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  // The suites share one database, so they must not run in parallel.
  maxWorkers: 1,
  testTimeout: 20000,
};
