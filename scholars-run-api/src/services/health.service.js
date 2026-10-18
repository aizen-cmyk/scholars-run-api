const gameInfo = require('../config/game-info');
const healthRepository = require('../repositories/health.repository');

const getHealth = async () => {
  let database = 'up';
  let status = 'ok';

  try {
    await healthRepository.ping();
  } catch (error) {
    console.error('Health check database connection failed:', error.message);
    database = 'down';
    status = 'error';
  }

  return {
    status,
    service: gameInfo.name,
    version: gameInfo.version,
    database,
    uptime_seconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  };
};

module.exports = { getHealth };
