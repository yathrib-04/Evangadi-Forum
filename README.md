# Evangadi Forum

A full-stack question-and-answer platform for the Evangadi Networks community.
Members register, ask questions, and answer each other — a focused Stack
Overflow for a single network.

React 19 · Node.js · Express 5 · MySQL 8 · JWT · Tailwind CSS · Swagger

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Running the app](#running-the-app)
- [API reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment variables](#environment-variables)
- [Known limitations](#known-limitations)
- [License](#license)

---

## Features

**Authentication**
Registration with a enforced password policy (8+ characters, upper, lower,
digit, symbol), bcrypt hashing, and stateless JWT sessions with a 2-hour
expiry. Protected routes on both the client and the API.

**Questions and answers**
Post a question, browse the community feed newest-first, open a question to
read its answers, and contribute your own. Every question and answer is
credited to its author.

**Interactive API documentation**
Swagger UI at `/api-docs`, generated from JSDoc annotations that live beside
the route definitions.

**Responsive interface**
Tailwind CSS with a centralised brand palette, shared layout components, and
accessible forms.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7, Axios, Tailwind CSS 3, Create React App |
| Backend | Node.js, Express 5, `mysql2` (parameterised raw SQL) |
| Database | MySQL 8, schema managed by Prisma Migrate |
| Auth | `jsonwebtoken`, `bcrypt` |
| Docs | `swagger-jsdoc`, `swagger-ui-express` |
| Tests | Jest + Supertest (backend), Jest + React Testing Library (frontend) |

**A note on Prisma.** Prisma owns the schema and migrations only. The
application queries MySQL through `mysql2` with parameterised SQL; the Prisma
client is not used at runtime. `prisma/schema.prisma` is kept accurate so
migrations and the queries stay in agreement.

---

## Project structure

```
Evangadi-Forum/
├── Backend/
│   ├── app.js                  Express app - built and exported, not started
│   ├── server.js               Entry point: env checks, DB probe, listen()
│   ├── Controller/             Route handlers (raw parameterised SQL)
│   ├── routes/                 Routers + Swagger JSDoc annotations
│   ├── middleware/             JWT verification
│   ├── DB/dbConfig.js          mysql2 connection pool
│   ├── prisma/                 Schema and migrations
│   ├── scripts/                Local MySQL launcher, test-DB provisioning
│   └── tests/                  Integration tests (57)
└── frontend/
    └── src/
        ├── Pages/              Login, Register, Home, AskQuestion,
        │                       QuestionDetail, HowItWorks (+ tests)
        ├── components/         Header, Footer, AboutPanel, ProtectedRoute
        ├── hooks/useLogout.js  Shared logout behaviour
        └── axiosConfig.js      API client + auth interceptor
```

`app.js` and `server.js` are deliberately separate: the test suite imports the
app and drives it without binding a port.

---

## Getting started

### Prerequisites

- Node.js 18 or newer
- MySQL 8
- npm

### 1. Clone and install

```bash
git clone https://github.com/yathrib-04/Evangadi-Forum.git
cd Evangadi-Forum

cd Backend && npm install
cd ../frontend && npm install
```

### 2. Configure the backend

```bash
cd Backend
cp .env.example .env
```

Fill in your MySQL credentials and a `JWT_SECRET`. See
[Environment variables](#environment-variables) for the full list.

### 3. Create the database and apply migrations

```sql
CREATE DATABASE evangadi_forum
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
cd Backend
npx prisma migrate deploy
```

<details>
<summary>If you cannot start the machine-wide MySQL service</summary>

This repository includes `Backend/scripts/start-mysql.ps1`, which runs a
MySQL instance under your own user account — useful on Windows when the
`MySQL80` service requires administrator rights. It uses its own data
directory and port `3307`, so it never collides with a system installation.

```bash
cd Backend
npm run db      # leave this window open
```

It is an ordinary process, not a service, so it does not restart after a
reboot. Point `DB_PORT` at `3307` in `.env` when using it.

</details>

---

## Running the app

Two terminals:

```bash
# Terminal 1 — API on http://localhost:5000
cd Backend
npm start          # or: npm run dev   (nodemon, auto-reload)
```

```bash
# Terminal 2 — UI on http://localhost:3000
cd frontend
npm start
```

| | |
|---|---|
| Application | http://localhost:3000 |
| API | http://localhost:5000 |
| Swagger UI | http://localhost:5000/api-docs |
| Health check | http://localhost:5000/health |

### Frontend routes

| Route | Access |
|---|---|
| `/login`, `/register`, `/how-it-works` | Public |
| `/` (question feed) | Authenticated |
| `/ask-question` | Authenticated |
| `/question/:questionid` | Authenticated |

---

## API reference

All authenticated endpoints expect `Authorization: Bearer <token>`.

### Users

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `POST` | `/api/users/register` | — | Create an account |
| `POST` | `/api/users/login` | — | Exchange credentials for a JWT |
| `GET` | `/api/users/check` | ✓ | Verify a token, return the caller's identity |
| `DELETE` | `/api/users/:userid` | ✓ | Delete your **own** account (403 otherwise) |

### Questions

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `GET` | `/api/questions` | ✓ | All questions, newest first |
| `GET` | `/api/questions/:questionid` | ✓ | A single question |
| `POST` | `/api/questions` | ✓ | Create a question |

### Answers

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| `GET` | `/api/answers/:questionid` | ✓ | Answers for a question, oldest first |
| `POST` | `/api/answers` | ✓ | Post an answer |

### System

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | `{"status":"ok"}` — for deployment probes |
| `GET` | `/api-docs` | Swagger UI |

Questions are identified by a UUID; users and answers by an auto-incrementing
integer. An empty question list returns `200` with `[]`, not `404`.

---

## Testing

```bash
# Backend — 57 integration tests
cd Backend
npm run test:setup     # creates evangadi_forum_test, applies migrations (once)
npm test

# Frontend — 30 component tests
cd frontend
npm test
```

Backend tests run against **real MySQL**, not a mocked driver. The controllers
are raw SQL, so a mock would verify nothing about whether the queries are
correct. Each test starts from a truncated database, and the suites run
serially because they share it. Re-run `npm run test:setup` after adding a
migration.

Coverage includes password hashing and policy enforcement, duplicate accounts,
forged/expired/malformed tokens, ownership checks on account deletion,
author attribution derived from the token rather than the request body, and
SQL injection attempts in path parameters.

---

## Deployment

### Frontend

`REACT_APP_API_URL` is inlined at **build time** — changing it afterwards has
no effect without a rebuild:

```bash
cd frontend
REACT_APP_API_URL=https://your-api.example.com/api npm run build
```

Routing is handled in the browser, so the host must serve `index.html` for
every path. Without this, a direct visit or refresh on `/how-it-works`,
`/login` or `/register` returns 404. Configuration is included for each host:

| Host | File | Notes |
|---|---|---|
| Netlify | `frontend/public/_redirects` | Copied into `build/` automatically |
| Vercel | `frontend/vercel.json` | Set the project root to `frontend/` |
| nginx / self-hosted | `frontend/nginx.conf.example` | Serve `frontend/build` |

### Backend

The API reads real environment variables; no `.env` file is required in
production. Deploy the `Backend/` directory, set the variables below, and run:

```bash
npx prisma migrate deploy
npm start
```

The server exits with an explicit message if a required variable is missing or
the database is unreachable, rather than starting and failing every request.
Point your platform's health check at `GET /health`.

---

## Environment variables

### Backend (`Backend/.env`)

| Variable | Required | Description |
|---|:--:|---|
| `PORT` | | API port (default `5000`) |
| `DB_HOST` | | MySQL host (default `localhost`) |
| `DB_PORT` | | MySQL port (default `3306`) |
| `DB_USER` | ✓ | MySQL user |
| `DB_PASSWORD` | | MySQL password |
| `DB_NAME` | ✓ | Database name |
| `DATABASE_URL` | ✓ | Same connection as a URL, for Prisma Migrate |
| `JWT_SECRET` | ✓ | Long random string used to sign tokens |
| `CORS_ORIGIN` | | Allowed frontend origin (default `http://localhost:3000`) |
| `PUBLIC_API_URL` | | This API's public origin, shown in the Swagger docs |

> `DB_`-prefixed names are deliberate: a bare `USER` variable collides with a
> shell built-in on Linux and macOS and silently overrides `.env`.

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | API base URL including `/api`. Inlined at build time. |

Only variables prefixed with `REACT_APP_` are exposed by Create React App.

---

## Known limitations

- **Terms of Service** and **Privacy policy** links are placeholders.
- No rate limiting on `POST /api/users/login`.
- The JWT is stored in `localStorage`.
- Form feedback uses `window.alert` rather than inline validation messages.

---

## License

ISC.
