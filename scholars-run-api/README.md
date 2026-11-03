# Scholar's Run Backend

Week 10 Express 5 and Sequelize 6 backend scaffold for Scholar's Run.

## Requirements

- Node.js 22+
- PostgreSQL 16+

## Setup

```powershell
npm install
Copy-Item .env.example .env
```

Set `DB_PASSWORD` in `.env`, then create and populate the database:

```powershell
npm run db:create
npm run db:migrate
npm run db:seed
npm run db:check
npm run dev
```

The API is mounted under `/api/v1`:

- `GET http://localhost:3001/api/v1/health`
- `GET http://localhost:3001/api/v1/game-info`

`db:check` reports row counts for all ten tables and exits unsuccessfully if any
table is empty. Set `EXPECTED` to a non-empty value in `.env` to allow empty
tables during development.

## Week 11 API

### Module 1 - tournament-sessions (full CRUD for the host-managed resource)

| Verb | URL | Who may call |
|------|-----|--------------|
| GET | `/api/v1/tournament-sessions` | HOST, ADMIN (hosts see their own) |
| GET | `/api/v1/tournament-sessions/:id` | HOST, ADMIN (owner only) |
| POST | `/api/v1/tournament-sessions` | HOST, ADMIN |
| PATCH | `/api/v1/tournament-sessions/:id` | HOST, ADMIN (owner only) |
| DELETE | `/api/v1/tournament-sessions/:id` | HOST, ADMIN (owner only; 409 if used in a game) |

All Module 1 routes require the `X-Demo-User` header. A client can never choose `host_id`; it is always set to the caller.

### Module 2 - sessions and joining

| Verb | URL | Who may call |
|------|-----|--------------|
| POST | `/api/v1/sessions` | HOST, ADMIN (starts a game, status LOBBY, 6-digit join code) |
| GET | `/api/v1/sessions/:code` | anyone (read one game by join code) |
| PATCH | `/api/v1/sessions/:code` | HOST, ADMIN (host of that game only; LOBBY→RUNNING/CLOSED, RUNNING→CLOSED) |
| POST | `/api/v1/sessions/:code/players` | any known account (join or rejoin) |
| GET | `/api/v1/sessions/:code/players` | anyone (nicknames and scores only) |
| GET | `/api/v1/results` | requires `X-Hub-Key` header (lists CLOSED games) |

### Join order (first "no" decides)

1. Known account? (`requireUser`) → 401 AUTH_REQUIRED
2. Well-formed? (code six digits; nickname required, text, trimmed, min 2, max 100) → 400 VALIDATION_FAILED
3. Game with this code exists? → 404 SESSION_NOT_FOUND
4. Does this account already have a seat in this game? (by `session_id` + `player_id`, never nickname) → 200 rejoined
5. Does this account have a seat in another RUNNING game? → 409 ALREADY_IN_GAME
6. Status CLOSED → 409 SESSION_ENDED; status not LOBBY → 409 SESSION_NOT_JOINABLE
7. Seats taken >= max_players → 409 SESSION_FULL
8. Insert seat; duplicate nickname decided by DB UNIQUE → 409 NICKNAME_TAKEN

### Our rule for completed

If nobody has answered a question yet, `completed` is `false`, `rank` is `null` and the podium is empty. This repo does not store answers, so every closed game reports `completed: false`, `rank: null`, `podium: []`.

### How to test

```powershell
npm run db:reset
npm run dev
```

Then import `postman/ScholarsRun-Week11.postman_collection.json` into Postman and run the collection. It contains two folders: "Module 1 - tournament-sessions" and "Module 2 - sessions and joining".
