'use strict';

const resultsService = require('../services/results.service');

async function getResults(req, res) {
  const hubKey = req.headers['x-hub-key'];
  const since = req.query.since;

  const data = await resultsService.getResults(hubKey, since);
  res.status(200).json(data);
}

module.exports = { getResults };