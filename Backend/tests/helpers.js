const request = require("supertest");
const app = require("../app");

const VALID_PASSWORD = "Passw0rd!x";

// Registers a user and returns their token plus identity. Used by the suites
// that need an authenticated caller.
async function registerAndLogin(overrides = {}) {
  const suffix = Math.random().toString(36).slice(2, 8);
  const user = {
    username: `user_${suffix}`,
    firstname: "Test",
    lastname: "User",
    email: `${suffix}@example.com`,
    password: VALID_PASSWORD,
    ...overrides,
  };

  await request(app).post("/api/users/register").send(user).expect(201);

  const res = await request(app)
    .post("/api/users/login")
    .send({ email: user.email, password: user.password })
    .expect(200);

  return { ...user, token: res.body.token, userid: res.body.userid };
}

async function createQuestion(token, body = {}) {
  const payload = {
    title: "How do I connect Node to MySQL?",
    description: "I want to know how to connect Node.js to a MySQL database.",
    ...body,
  };
  await request(app)
    .post("/api/questions")
    .set("Authorization", `Bearer ${token}`)
    .send(payload)
    .expect(201);

  const list = await request(app)
    .get("/api/questions")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  return list.body.questions[0];
}

module.exports = { app, request, registerAndLogin, createQuestion, VALID_PASSWORD };
