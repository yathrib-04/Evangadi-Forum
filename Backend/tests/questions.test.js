const { app, request, registerAndLogin, createQuestion } = require("./helpers");

describe("GET /api/questions", () => {
  it("returns 200 and an empty list when there are no questions", async () => {
    const user = await registerAndLogin();
    const res = await request(app)
      .get("/api/questions")
      .set("Authorization", `Bearer ${user.token}`);

    // Regression: this used to return 404 for an empty forum.
    expect(res.status).toBe(200);
    expect(res.body.questions).toEqual([]);
  });

  it("requires authentication", async () => {
    const res = await request(app).get("/api/questions");
    expect(res.status).toBe(401);
  });

  it("includes the author's username", async () => {
    const user = await registerAndLogin();
    await createQuestion(user.token);

    const res = await request(app)
      .get("/api/questions")
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.body.questions[0].username).toBe(user.username);
  });

  it("returns newest first", async () => {
    const user = await registerAndLogin();
    await createQuestion(user.token, { title: "first" });
    await new Promise((r) => setTimeout(r, 1100)); // created_at has second precision
    await createQuestion(user.token, { title: "second" });

    const res = await request(app)
      .get("/api/questions")
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.body.questions.map((q) => q.title)).toEqual(["second", "first"]);
  });
});

describe("POST /api/questions", () => {
  it("creates a question and returns 201", async () => {
    const user = await registerAndLogin();
    const res = await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ title: "A title", description: "A description" });
    expect(res.status).toBe(201);
  });

  it("assigns a uuid questionid", async () => {
    const user = await registerAndLogin();
    const question = await createQuestion(user.token);
    expect(question.questionid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });

  it.each([
    ["title", { title: undefined }],
    ["description", { description: undefined }],
  ])("rejects a missing %s with 400", async (_field, override) => {
    const user = await registerAndLogin();
    const res = await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ title: "t", description: "d", ...override });
    expect(res.status).toBe(400);
  });

  it("requires authentication", async () => {
    const res = await request(app)
      .post("/api/questions")
      .send({ title: "t", description: "d" });
    expect(res.status).toBe(401);
  });

  it("stores a long description without truncating it", async () => {
    // Regression: description was VARCHAR(191) and silently cut off.
    const user = await registerAndLogin();
    const description = "x".repeat(2000);
    const question = await createQuestion(user.token, { description });

    const res = await request(app)
      .get(`/api/questions/${question.questionid}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.body.question.description).toHaveLength(2000);
  });

  it("attributes the question to the token's user, not a client-supplied id", async () => {
    const alice = await registerAndLogin();
    const bob = await registerAndLogin();

    await request(app)
      .post("/api/questions")
      .set("Authorization", `Bearer ${alice.token}`)
      .send({ title: "t", description: "d", userid: bob.userid })
      .expect(201);

    const res = await request(app)
      .get("/api/questions")
      .set("Authorization", `Bearer ${alice.token}`);

    expect(res.body.questions[0].username).toBe(alice.username);
  });
});

describe("GET /api/questions/:questionid", () => {
  it("returns the question", async () => {
    const user = await registerAndLogin();
    const created = await createQuestion(user.token, { title: "Findable" });

    const res = await request(app)
      .get(`/api/questions/${created.questionid}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(200);
    expect(res.body.question.title).toBe("Findable");
    expect(res.body.question.username).toBe(user.username);
  });

  it("returns 404 for an unknown id", async () => {
    const user = await registerAndLogin();
    const res = await request(app)
      .get("/api/questions/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.status).toBe(404);
  });

  it("requires authentication", async () => {
    const res = await request(app).get("/api/questions/some-id");
    expect(res.status).toBe(401);
  });

  it("is not vulnerable to SQL injection in the id", async () => {
    const user = await registerAndLogin();
    await createQuestion(user.token);

    const res = await request(app)
      .get(`/api/questions/${encodeURIComponent("' OR '1'='1")}`)
      .set("Authorization", `Bearer ${user.token}`);

    // Parameterised query - the payload matches nothing rather than everything.
    expect(res.status).toBe(404);
  });
});
