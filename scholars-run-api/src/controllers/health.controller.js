const healthService = require('../services/health.service');

const getHealth = async (req, res, next) => {
  try {
    const result = await healthService.getHealth();
    res.status(result.database === 'up' ? 200 : 503).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getHealth };
