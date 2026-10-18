'use strict';

const resultsRepository = require('./results.repository');
const env = require('../config/env');

async function getResults(hubKey, since) {
  if (hubKey !== env.hubApiKey) {
    const err = new Error('Invalid hub key');
    err.status = 401;
    err.code = 'UNAUTHORIZED';
    throw err;
  }

  if (since !== undefined && (Number.isNaN(Number(since)) || since === '')) {
    const err = new Error('Invalid since parameter');
    err.status = 400;
    err.code = 'BAD_REQUEST';
    throw err;
  }

  const sinceNum = since ? Number(since) : undefined;
  const results = await resultsRepository.getResults(hubKey, sinceNum);

  return {
    game: 'scholars-run',
    generated_at: new Date().toISOString(),
    results
  };
}

module.exports = { getResults };