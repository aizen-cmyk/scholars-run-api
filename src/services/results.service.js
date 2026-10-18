'use strict';

const resultsRepository = require('../repositories/results.repository');
const env = require('../config/env');

function parseSince(since) {
  if (since === undefined || since === null || since === '') return undefined;
  // Try parsing as Unix timestamp first
  const asNumber = Number(since);
  if (!Number.isNaN(asNumber)) return asNumber;
  // Try parsing as ISO date string
  const asDate = Date.parse(since);
  if (!Number.isNaN(asDate)) return Math.floor(asDate / 1000);
  // Invalid format
  return null;
}

async function getResults(hubKey, since) {
  if (hubKey !== env.hubApiKey) {
    const err = new Error('Invalid hub key');
    err.status = 401;
    err.code = 'UNAUTHORIZED';
    throw err;
  }

  const sinceNum = parseSince(since);
  if (sinceNum === null) {
    const err = new Error('Invalid since parameter');
    err.status = 400;
    err.code = 'BAD_REQUEST';
    throw err;
  }

  const results = await resultsRepository.getResults(sinceNum);

  return {
    game: 'scholars-run',
    generated_at: new Date().toISOString(),
    results
  };
}

module.exports = { getResults };