import express from "express";
import { createdDay } from "./dates";
import { isValidEmail } from "./email";
import { pageWindow } from "./pagination";
import { publicUser, users } from "./users";

export const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/login", (req, res) => {
  const email = String(req.body?.email ?? "");
  const password = String(req.body?.password ?? "");
  if (!isValidEmail(email)) {
    res.status(400).json({ error: "invalid email" });
    return;
  }
  const user = users.find((candidate) => candidate.email === email);
  if (!user || user.password !== password) {
    res.status(401).json({ error: "invalid credentials" });
    return;
  }
  res.json({ token: `tok_${user.id}`, userId: user.id });
});

app.get("/users", (req, res) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);
  const { start, end } = pageWindow(page, limit);
  res.json({
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    limit: Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 20,
    total: users.length,
    users: users.slice(start, end).map(publicUser),
  });
});

app.get("/users/:id", (req, res) => {
  const user = users.find((candidate) => candidate.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: "not found" });
    return;
  }
  const timeZone = String(req.query.timeZone ?? "UTC");
  res.json({
    ...publicUser(user),
    createdDay: createdDay(user.createdAt, timeZone),
  });
});
