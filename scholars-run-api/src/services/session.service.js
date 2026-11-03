const { notFound, forbidden, conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');
const sessionRepository = require('../repositories/session.repository');

const MAX_CODE_ATTEMPTS = 5;

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function findOrFail(code) {
  const row = await sessionRepository.findByCode(code);
  if (!row) throw notFound('SESSION_NOT_FOUND', 'No game session with that join code.');
  return row;
}

async function create(data, user) {
  if (user.role !== 'HOST' && user.role !== 'ADMIN') {
    throw forbidden('Only hosts may start a game session.');
  }
  let attempts = 0;
  while (attempts < MAX_CODE_ATTEMPTS) {
    const code = generateCode();
    try {
      return await sessionRepository.create({
        ...data,
        host_id: user.user_id,
        code,
        status: 'LOBBY'
      });
    } catch (error) {
      if (constraintOf(error) === 'uq_tournament_sessions_code') {
        attempts += 1;
        continue;
      }
      throw error;
    }
  }
  throw conflict('CODE_GENERATION_FAILED', 'Unable to generate a unique join code. Please try again.');
}

async function changeStatus(code, status, user) {
  const row = await findOrFail(code);
  if (row.host_id !== user.user_id && user.role !== 'ADMIN') {
    throw forbidden('Only the host of this game may change its status.');
  }

  const current = row.status;
  const allowed = {
    LOBBY: ['RUNNING', 'CLOSED'],
    RUNNING: ['CLOSED'],
    CLOSED: []
  };
  if (!allowed[current] || !allowed[current].includes(status)) {
    throw conflict('INVALID_STATUS_CHANGE', `Cannot change status from ${current} to ${status}.`);
  }

  const changes = { status };
  if (status === 'RUNNING') changes.started_at = new Date();
  if (status === 'CLOSED') changes.ended_at = new Date();
  return sessionRepository.update(row, changes);
}

module.exports = { findOrFail, create, changeStatus };
