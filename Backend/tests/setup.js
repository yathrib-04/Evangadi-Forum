const db = require("../DB/dbConfig");

// Every test starts from an empty database so suites can't leak into each other.
beforeEach(async () => {
  await db.query("SET FOREIGN_KEY_CHECKS = 0");
  await db.query("TRUNCATE TABLE answers");
  await db.query("TRUNCATE TABLE questions");
  await db.query("TRUNCATE TABLE users");
  await db.query("SET FOREIGN_KEY_CHECKS = 1");
});

// Release the pool, otherwise Jest hangs on open handles.
afterAll(async () => {
  await db.end();
});
