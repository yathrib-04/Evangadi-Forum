const { app, request, registerAndLogin, createQuestion } = require("./helpers");

describe("POST /api/answers", () => {
  it("posts an answer and returns 201", async () => {
    const user = await registerAndLogin();
    const question = await createQuestion(user.token);

    const res = await request(app)
      .post("/api/answers")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ questionid: question.questionid, answer: "Use the mysql2 package." });

    expect(res.status).toBe(201);
  });

  it("returns 404 for a question that does not exist", async () => {
    const user = await registerAndLogin();
    const res = await request(app)
      .post("/api/answers")
      .set("Authorization", `Bearer ${user.token}`)
      .send({
        questionid: "00000000-0000-0000-0000-000000000000",
        answer: "orphan",
      });
    expect(res.status).toBe(404);
  });

  it.each([
    ["questionid", { questionid: undefined }],
    ["answer", { answer: undefined }],
  ])("rejects a missing %s with 400", async (_field, override) => {
    const user = await registerAndLogin();
    const question = await createQuestion(user.token);

    const res = await request(app)
      .post("/api/answers")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ questionid: question.questionid, answer: "a", ...override });

    expect(res.status).toBe(400);
  });

  it("requires authentication", async () => {
    const res = await request(app)
      .post("/api/answers")
      .send({ questionid: "x", answer: "y" });
    expect(res.status).toBe(401);
  });

  it("stores a long answer without truncating it", async () => {
    // Regression: answer was VARCHAR(191).
    const user = await registerAndLogin();
    const question = await createQuestion(user.token);
    const answer = "y".repeat(2000);

    await request(app)
      .post("/api/answers")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ questionid: question.questionid, answer })
      .expect(201);

    const res = await request(app)
      .get(`/api/answers/${question.questionid}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.body.answers[0].answer).toHaveLength(2000);
  });

  it("lets a different user answer someone else's question", async () => {
    const asker = await registerAndLogin();
    const answerer = await registerAndLogin();
    const question = await createQuestion(asker.token);

    await request(app)
      .post("/api/answers")
      .set("Authorization", `Bearer ${answerer.token}`)
      .send({ questionid: question.questionid, answer: "from someone else" })
      .expect(201);

    const res = await request(app)
      .get(`/api/answers/${question.questionid}`)
      .set("Authorization", `Bearer ${asker.token}`);

    expect(res.body.answers[0].username).toBe(answerer.username);
  });
});

describe("GET /api/answers/:questionid", () => {
  it("returns an empty list for a question with no answers", async () => {
    const user = await registerAndLogin();
    const question = await createQuestion(user.token);

    const res = await request(app)
      .get(`/api/answers/${question.questionid}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.status).toBe(200);
    expect(res.body.answers).toEqual([]);
  });

  it("returns answers oldest first with their author", async () => {
    const user = await registerAndLogin();
    const question = await createQuestion(user.token);

    for (const answer of ["first", "second"]) {
      await request(app)
        .post("/api/answers")
        .set("Authorization", `Bearer ${user.token}`)
        .send({ questionid: question.questionid, answer })
        .expect(201);
      await new Promise((r) => setTimeout(r, 1100));
    }

    const res = await request(app)
      .get(`/api/answers/${question.questionid}`)
      .set("Authorization", `Bearer ${user.token}`);

    expect(res.body.answers.map((a) => a.answer)).toEqual(["first", "second"]);
    expect(res.body.answers[0].username).toBe(user.username);
  });

  it("returns 404 for a question that does not exist", async () => {
    const user = await registerAndLogin();
    const res = await request(app)
      .get("/api/answers/00000000-0000-0000-0000-000000000000")
      .set("Authorization", `Bearer ${user.token}`);
    expect(res.status).toBe(404);
  });

  it("requires authentication", async () => {
    const res = await request(app).get("/api/answers/some-id");
    expect(res.status).toBe(401);
  });
});

describe("app-level behaviour", () => {
  it("exposes a health check", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("returns JSON 404 for an unknown API route", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Not Found");
  });
});
