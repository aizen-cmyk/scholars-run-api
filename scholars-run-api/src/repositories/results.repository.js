const { TournamentSession } = require('../models');

function findClosedSessions() {
  return TournamentSession.findAll({
    where: { status: 'CLOSED' },
    attributes: ['code', 'status', 'started_at', 'ended_at'],
    order: [['session_id', 'ASC']]
  });
}

module.exports = { findClosedSessions };
