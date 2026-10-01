import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app";

describe("fixture api", () => {
  it("reports health", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it("logs in with a plain email", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "ada@example.com", password: "analytical" });
    expect(res.status).toBe(200);
    expect(res.body.userId).toBe("u_ada");
    expect(res.body.token).toBe("tok_u_ada");
  });

  it("rejects a wrong password", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "ada@example.com", password: "nope" });
    expect(res.status).toBe(401);
  });

  it("rejects an address without a domain", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "not-an-email", password: "analytical" });
    expect(res.status).toBe(400);
  });

  it("returns the first page of users", async () => {
    const res = await request(app).get("/users").query({ page: 1, limit: 2 });
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(5);
    expect(res.body.users).toHaveLength(2);
    expect(res.body.users[0].id).toBe("u_ada");
    expect(res.body.users[1].id).toBe("u_grace");
    expect(res.body.users[0].password).toBeUndefined();
  });

  it("formats a midday timestamp as that UTC day", async () => {
    const res = await request(app)
      .get("/users/u_grace")
      .query({ timeZone: "UTC" });
    expect(res.status).toBe(200);
    expect(res.body.createdAt).toBe("2024-06-15T16:00:00.000Z");
    expect(res.body.createdDay).toBe("2024-06-15");
  });
});
