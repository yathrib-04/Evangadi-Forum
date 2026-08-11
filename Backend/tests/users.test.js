const { app, request, registerAndLogin, VALID_PASSWORD } = require("./helpers");
const db = require("../DB/dbConfig");

const validUser = {
  username: "yathrib",
  firstname: "Yathrib",
  lastname: "Aman",
  email: "yathrib@example.com",
  password: VALID_PASSWORD,
};

describe("POST /api/users/register", () => {
  it("creates a user", async () => {
    const res = await request(app).post("/api/users/register").send(validUser);
    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/registered/i);
  });

  it("stores the password hashed, never in plain text", async () => {
    await request(app).post("/api/users/register").send(validUser).expect(201);
    const [rows] = await db.query("SELECT password FROM users WHERE email = ?", [
      validUser.email,
    ]);
    expect(rows[0].password).not.toBe(validUser.password);
    expect(rows[0].password).toMatch(/^\$2[aby]\$/); // bcrypt
  });

  it.each([
    ["username", { username: undefined }],
    ["firstname", { firstname: undefined }],
    ["lastname", { lastname: undefined }],
    ["email", { email: undefined }],
    ["password", { password: undefined }],
  ])("rejects a missing %s with 400", async (_field, override) => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ ...validUser, ...override });
    expect(res.status).toBe(400);
  });

  it.each([
    ["too short", "Ab1!"],
    ["no uppercase", "passw0rd!"],
    ["no lowercase", "PASSW0RD!"],
    ["no digit", "Password!"],
    ["no symbol", "Passw0rdx"],
  ])("rejects a weak password (%s) with 400", async (_label, password) => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ ...validUser, password });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/password/i);
  });

  it("rejects a duplicate email with 409", async () => {
    await request(app).post("/api/users/register").send(validUser).expect(201);
    const res = await request(app)
      .post("/api/users/register")
      .send({ ...validUser, username: "different" });
    expect(res.status).toBe(409);
  });

  it("rejects a duplicate username with 409", async () => {
    await request(app).post("/api/users/register").send(validUser).expect(201);
    const res = await request(app)
      .post("/api/users/register")
      .send({ ...validUser, email: "other@example.com" });
    expect(res.status).toBe(409);
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/users/register").send(validUser).expect(201);
  });

  it("returns a token, username and userid", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: validUser.email, password: validUser.password });
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
    expect(res.body.username).toBe(validUser.username);
    expect(typeof res.body.userid).toBe("number");
  });

  it("never returns the password hash", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: validUser.email, password: validUser.password });
    expect(JSON.stringify(res.body)).not.toMatch(/\$2[aby]\$/);
  });

  it("rejects a wrong password with 400", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: validUser.email, password: "Wrongpass1!" });
    expect(res.status).toBe(400);
  });

  it("rejects an unknown email with 400", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "nobody@example.com", password: validUser.password });
    expect(res.status).toBe(400);
  });

  it("does not reveal whether the email exists", async () => {
    const wrongPassword = await request(app)
      .post("/api/users/login")
      .send({ email: validUser.email, password: "Wrongpass1!" });
    const unknownEmail = await request(app)
      .post("/api/users/login")
      .send({ email: "nobody@example.com", password: validUser.password });
    expect(wrongPassword.body.message).toBe(unknownEmail.body.message);
  });

  it("rejects missing credentials with 400", async () => {
    const res = await request(app).post("/api/users/login").send({});
    expect(res.status).toBe(400);
  });
});

describe("GET /api/users/check", () => {
  it("returns the caller identity for a valid token", async () => {
    const user = await registerAndLogin();
    const res = await request(app)
      .get("/api/users/check")
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe(user.username);
    expect(res.body.userid).toBe(user.userid);
  });

  it("rejects a missing token with 401", async () => {
    const res = await request(app).get("/api/users/check");
    expect(res.status).toBe(401);
  });

  it("rejects a malformed Authorization header with 401", async () => {
    const res = await request(app)
      .get("/api/users/check")
      .set("Authorization", "some-token-without-bearer");
    expect(res.status).toBe(401);
  });

  it("rejects a token signed with the wrong secret with 401", async () => {
    const jwt = require("jsonwebtoken");
    const forged = jwt.sign({ userid: 1, username: "mallory" }, "wrong-secret");
    const res = await request(app)
      .get("/api/users/check")
      .set("Authorization", `Bearer ${forged}`);
    expect(res.status).toBe(401);
  });

  it("rejects an expired token with 401", async () => {
    const jwt = require("jsonwebtoken");
    const expired = jwt.sign(
      { userid: 1, username: "old" },
      process.env.JWT_SECRET,
      { expiresIn: "-1s" }
    );
    const res = await request(app)
      .get("/api/users/check")
      .set("Authorization", `Bearer ${expired}`);
    expect(res.status).toBe(401);
  });
});

describe("DELETE /api/users/:userid", () => {
  it("refuses to delete another user's account with 403", async () => {
    const alice = await registerAndLogin();
    const bob = await registerAndLogin();

    const res = await request(app)
      .delete(`/api/users/${bob.userid}`)
      .set("Authorization", `Bearer ${alice.token}`);

    expect(res.status).toBe(403);

    // Bob must still exist.
    const [rows] = await db.query("SELECT userid FROM users WHERE userid = ?", [
      bob.userid,
    ]);
    expect(rows).toHaveLength(1);
  });

  it("deletes the caller's own account", async () => {
    const user = await registerAndLogin();
    const res = await request(app)
      .delete(`/api/users/${user.userid}`)
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.status).toBe(200);

    const [rows] = await db.query("SELECT userid FROM users WHERE userid = ?", [
      user.userid,
    ]);
    expect(rows).toHaveLength(0);
  });

  it("returns 409, not 500, when the account still owns questions", async () => {
    const user = await registerAndLogin();
    await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ title: "t", description: "d" })
      .expect(201);

    const res = await request(app)
      .delete(`/api/users/${user.userid}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/questions or answers/i);
  });

  it("requires authentication", async () => {
    const res = await request(app).delete("/api/users/1");
    expect(res.status).toBe(401);
  });
});
