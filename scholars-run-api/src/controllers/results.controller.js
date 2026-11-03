const { unauthorized } = require('../errors/app-error');
const resultsService = require('../services/results.service');

const getResults = async (req, res) => {
  const hubKey = req.get('X-Hub-Key');
  const expectedKey = process.env.HUB_KEY;
  if (!hubKey || hubKey !== expectedKey) {
    throw unauthorized('Send the X-Hub-Key header to read results.');
  }
  const results = await resultsService.getResults();
  res.status(200).json(results);
};

module.exports = { getResults };
