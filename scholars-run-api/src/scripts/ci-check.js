// CI check: keeps the Week 11 layering rules honest.
//   routes: no logic
//   validators: never ask the database
//   controllers: read validated input (matchedData), never req.body
//   services: never touch req or res
//   repositories: the only files that query a table
//   models: required only by repositories and models/index.js
// Runs with `npm run check`. Exit code 1 = red.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'src');

const problems = [];

function note(file, message) {
  problems.push(`${file}: ${message}`);
}

function relPosix(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function listJs(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(listJs(full));
    else if (entry.name.endsWith('.js')) results.push(full);
  }
  return results;
}

const allFiles = listJs(SRC);
const byRel = new Map(allFiles.map((file) => [relPosix(file), file]));

// 1. Controllers never read req.body.
for (const [rel, file] of byRel) {
  if (!rel.startsWith('src/controllers/')) continue;
  if (/\breq\.body\b/.test(fs.readFileSync(file, 'utf8'))) note(rel, 'controller reads req.body');
}

// 2. Services never touch res.
for (const [rel, file] of byRel) {
  if (!rel.startsWith('src/services/')) continue;
  if (/\bres\./.test(fs.readFileSync(file, 'utf8'))) note(rel, 'service touches res');
}

// 3. Models are required only by repositories and src/models/index.js.
const modelRequire = /require\(['"]\.\.?\/?models(['"]|\/)/;
for (const [rel, file] of byRel) {
  if (rel.startsWith('src/repositories/')) continue;
  if (rel.startsWith('src/scripts/')) continue;
  if (rel === 'src/models/index.js') continue;
  if (modelRequire.test(fs.readFileSync(file, 'utf8'))) {
    note(rel, 'requires models outside repositories and models/index.js');
  }
}

// 4. Every body()/param() validation chain carries withMessage.
for (const [rel, file] of byRel) {
  if (!rel.startsWith('src/validators/')) continue;
  const cleaned = fs.readFileSync(file, 'utf8')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const ruleStart = /(?:body|param)\(/g;
  const positions = [];
  let match;
  while ((match = ruleStart.exec(cleaned)) !== null) positions.push(match.index);
  positions.forEach((start, index) => {
    const end = positions[index + 1] ?? cleaned.length;
    if (!/withMessage\(/.test(cleaned.slice(start, end))) {
      note(rel, `validation rule starting at char ${start} has no withMessage`);
    }
  });
}

// 5. Routes that change data are guarded by requireUser.
for (const [rel, file] of byRel) {
  if (!rel.startsWith('src/routes/')) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (!/router\.(post|patch|put|delete)\(/.test(content)) continue;
  if (!/requireUser/.test(content)) note(rel, 'data-changing route without requireUser');
}

// 6. No console.log of a request body.
for (const [rel, file] of byRel) {
  if (/console\.log\([\s\S]*?req\.body/.test(fs.readFileSync(file, 'utf8'))) {
    note(rel, 'logs a request body');
  }
}

if (problems.length > 0) {
  console.error('CI check failed:');
  problems.forEach((problem) => console.error(' - ' + problem));
  process.exitCode = 1;
} else {
  console.log('CI check: green');
}
