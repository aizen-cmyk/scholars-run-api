const { sequelize } = require('../models');
const env = require('../config/env');

const tables = [
  'hosts',
  'players',
  'locations',
  'tournament_sessions',
  'session_players',
  'runs',
  'questions',
  'question_choices',
  'run_locations',
  'location_routes'
];

const checkDatabase = async () => {
  const counts = [];

  for (const table of tables) {
    const [result] = await sequelize.query(
      `SELECT COUNT(*)::int AS count FROM "${table}"`
    );
    counts.push({ table, count: result.count });
  }

  console.table(counts);
  if (!env.expected && counts.some((row) => row.count === 0)) {
    process.exitCode = 1;
    console.error('Database check failed: one or more tables are empty.');
  }
};

checkDatabase()
  .catch((error) => {
    process.exitCode = 1;
    console.error('Database check failed:', error.message);
  })
  .finally(async () => {
    await sequelize.close();
  });
