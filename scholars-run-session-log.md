# Scholar's Run: Session Log (18 Oct 2026)

Project: Scholar's Run backend API (CS313 Software Engineering 1, Team C3, Section 3-1)
Repo: `github.com/aizen-cmyk/scholars-run-api`
Stack: Node 22, Express 5, Sequelize 6, PostgreSQL 16
Goal of this session: get the **CS 313 automatic check** (GitHub Actions, `check.yml` → `npm run check` → `scripts/ci-check.js`) to pass.

---

## 1. Where things stand

| Item | Status |
|---|---|
| Git history rows (commits made locally, 5+ commits, typed messages) | Passing |
| `package.json` and `README.md` filled in | Passing |
| `.env` / `node_modules` not in repo | Passing |
| 10 migrations + 10 seeders | On disk in `Default Project`, **not committed yet** |
| `.env.example` has `HUB_API_KEY` | Fix written, **not applied yet** |
| `GET /game-info` has no `CHANGE_ME` | Fix written, **not applied yet** |
| `package.json` author changed to your name | Edited, **not committed yet** |
| `users` table, seat `UNIQUE`, seed for a finished game, results query | **Not done** |
| Latest local `npm run check` | Was still running; scorecard not seen yet |

Last GitHub run seen: `runs/39127765395`, **6 failed, 20 passed** (it predates your migrations).

---

## 2. Folders (important)

| Folder | What it is |
|---|---|
| `C:\Users\Andrew\Documents\Default Project` | **The one to use.** opencode's folder; real git repo, `origin` = the GitHub repo. Open this in VS Code. |
| `C:\New folder\scholars-run-api` | Old copy. Its git root was `C:\New folder` (wrong), so it could never push. It holds the original 10 migrations and 10 seeders (now copied across). |

Do not edit both. Work only in `Default Project`.

---

## 3. What went wrong and how each problem was fixed

1. **Placeholders in the first run (8 failed).** `package.json` and `README.md` still had `CHANGE_ME` values in GitHub. Cause: edits were made locally but never reached GitHub.
2. **Wrong git root.** `git rev-parse --show-toplevel` printed `C:/New folder`. The repo was one level too high. Resolved by switching to opencode's folder, which is correctly wired to GitHub.
3. **Missing `check` script.** A web upload overwrote `package.json`, dropping the template's `"check": "node scripts/ci-check.js"`. The line was recovered from the template's Initial commit (`641e642`) and added back.
4. **"Commits were made with Git on your own computer" row.** The web upload commit `b35b11d` ("Add files via upload") fails this row permanently, and 5 own commits are required. Fix:
   - `git branch backup-upload` (safety copy of the upload)
   - `git reset 641e642` (back to the template commit, files untouched)
   - 5 local commits: `e065f49` .gitignore, `cec4acc` .env.example, `179a696` .sequelizerc, `4551c5c` README, `6e5ecbb` package.json
   - `git push --force-with-lease origin main` (history rewritten: `b35b11d...6e5ecbb`)
5. **Branch mismatch.** Local branch was `master`, GitHub's is `main`. Switched with `git checkout -b main origin/main`.
6. **Wrong git identity.** The global git user was another project's (Trisha Joy Gutierrez). Set for this repo only:
   - `git config --local user.name "Mark Andrew C. Catamora"`
   - `git config --local user.email "markandrewcondacatamora@gmail.com"`
7. **Push rejected with 403.** Windows had a saved login for another GitHub account (`trishajoy`). Fixed with `git remote set-url origin https://aizen-cmyk@github.com/aizen-cmyk/scholars-run-api.git`, then signing in as `aizen-cmyk` in the browser.
8. **Migrations missing from the repo.** `db/migrations` and `db/seeders` in the repo contained only `.gitkeep`. The real files were in the old folder and were copied into `Default Project`.
9. **Local `npm run check` first failed on `.env`.** `Default Project` had no `.env`, so the checker reported missing keys. A `.env` was created (see section 6).

---

## 4. What the checker requires (read from `scripts/ci-check.js`)

- **`package.json`:** `description` and `author` must not contain `CHANGE_ME`. Author is currently being changed to `Mark Andrew C. Catamora`.
- **`.env.example`** must list: `NODE_ENV, PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, HUB_API_KEY`.
- **Migrations:** run on an empty DB, undo cleanly, run again. At least **4 tables**.
- **`users` table** with columns: `user_id, school_id, full_name, email, role`.
- **Seat rule:** a table with a `UNIQUE` constraint on exactly two columns, one being `user_id` (for example `session_players(session_id, user_id)`).
- **Seeds:** every table has rows; running `db:seed:all` twice must change nothing (idempotent); one finished game with **3 or more completed players**.
- **`GET /game-info`:** `slug` (lower case, hyphens), `name`, `team`, `developer`, `description`, `version` all set; `min_players` ≤ `max_players`; `developer` must equal the repo owner (`aizen-cmyk`).
- **`GET /results`:** needs the `X-Hub-Key` header (401 without it), returns `{ game, generated_at, results[] }`; each game has a six-digit `session_code`, `ended_at`, `players[]` (`school_id, nickname, score, completed`) and `podium[]`. `?since=` filters; a bad value returns 400.
- The query that feeds this is `src/repositories/results.repository.js` and is still the template placeholder.

---

## 5. Pending changes (contents ready)

**`.env.example`**: add at the end:

```
# The key the Library Game Hub sends in the X-Hub-Key header to read your results.
# Any value works on your own computer. The library gives the real key at deployment.
HUB_API_KEY=dev-hub-key
```

**`src/config/game-info.js`**: replace the file with:

```js
// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
const pkg = require('../../package.json');

module.exports = {
  slug: 'scholars-run',
  name: "Scholar's Run",
  team: 'Team C3 (3-1)',
  developer: 'aizen-cmyk',
  description: 'A campus quiz survival game where players choose a route through six locations, manage their Energy, and race for the highest score.',
  min_players: 2,
  max_players: 10,
  version: pkg.version,
};
```

**`package.json`**: `"author": "Mark Andrew C. Catamora"` (the `check` script must stay).

---

## 6. Local `.env` (root of `Default Project`, never committed)

```
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=scholars_run
DB_USER=postgres
DB_PASSWORD=<your PostgreSQL password>
HUB_API_KEY=dev-hub-key
# Set EXPECTED to any non-empty value to permit empty tables in db:check.
EXPECTED=
```

`npm run check` wipes and rebuilds the database named in `DB_NAME`. Keep it pointed at `scholars_run` only.

---

## 7. Next steps (in order)

1. Wait for the running `npm run check` to finish; note the ✘ lines. If it hangs, `Ctrl+C`, then run `node scripts/db-wipe.js` and `npx sequelize-cli db:migrate` one at a time to see the real error.
2. Apply the three pending edits in section 5.
3. `git status --short` should show `.env.example`, `src/config/game-info.js` and `package.json` as modified.
4. Commit by file name (never `git add .`, because `.qodo` and `package-lock.json` changes must not go in by accident):
   ```
   git add package.json
   git commit -m "chore: set package.json author"
   git add src/config/game-info.js .env.example
   git commit -m "chore: fill in game-info and restore HUB_API_KEY"
   git add db/migrations db/seeders
   git commit -m "feat(db): add migrations and seeders"
   ```
5. Fix what the local check still fails. Expected:
   - add a `users` table migration and seed
   - add `UNIQUE(session_id, user_id)` on `session_players`
   - give sessions a six-digit join code; store nickname and score per player
   - make seeds idempotent; seed one finished game with 3+ completed players
   - write the query in `results.repository.js`
6. `git push` (plain push works now; `main` tracks `origin/main`).
7. Open the new run on GitHub → Summary tab and review any ✘ rows.

---

## 8. Known gaps and notes

- **Sprint 1 ERD gaps:** no `users` table, no session join code, no per-player nickname/score, and no column for the Social Hall 2.5× perfect multiplier or a run's current location.
- **`dev` script** uses `nodemon`, which is not in `devDependencies`; `npm run dev` fails on a fresh install. Fix with `npm i -D nodemon` or change the script to `node --watch src/server.js`.
- **`.qodo/`** is an IDE folder inside the project; do not commit it.
- **`backup-upload`** local branch still holds the old web-upload commit; safe to delete later.
- **Going forward:** commit with git after each step (typed messages like `feat(db): ...`), not through the GitHub upload page. The checker flags website commits.

---

## 9. Command reference

```
git rev-parse --show-toplevel      # must end in Default Project
git remote -v                      # origin = aizen-cmyk/scholars-run-api
git status --short
git log --format="%h %an <%ae> %s" -6
npm install
npm run check                      # rebuilds local DB, runs the same checks as GitHub
```
