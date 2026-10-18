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
