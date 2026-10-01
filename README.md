# Fixture API

A small TypeScript HTTP API used by the Codex bug-fix experiment.

- `GET /health`
- `POST /login` with JSON `{ "email", "password" }`
- `GET /users?page=1&limit=20`
- `GET /users/:id?timeZone=UTC`

See `CONTRIBUTING.md` for how to run the tests.
