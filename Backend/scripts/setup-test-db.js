// Creates (or recreates) the test database and applies the Prisma migrations to
// it. Run once before `npm test`, and again whenever a migration is added.
//
// Tests run against real MySQL rather than a mock: the controllers are raw SQL,
// so a mocked driver would verify nothing about whether the queries are correct.
require("dotenv").config();
const mysql = require("mysql2/promise");
const { execFileSync } = require("child_process");
const path = require("path");

const TEST_DB = process.env.TEST_DB_NAME || "evangadi_forum_test";

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  await conn.query(`DROP DATABASE IF EXISTS \`${TEST_DB}\``);
  await conn.query(
    `CREATE DATABASE \`${TEST_DB}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conn.end();
  console.log(`Recreated database ${TEST_DB}`);

  const url =
    `mysql://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD || "")}` +
    `@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 3306}/${TEST_DB}`;

  execFileSync("npx", ["prisma", "migrate", "deploy"], {
    cwd: path.join(__dirname, ".."),
    env: { ...process.env, DATABASE_URL: url },
    stdio: "inherit",
    shell: true,
  });

  console.log(`Migrations applied to ${TEST_DB}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
