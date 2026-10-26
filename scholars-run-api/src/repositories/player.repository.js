const { SessionPlayer, TournamentSession } = require('../models');
const { Op } = require('sequelize');

function findSeat(sessionId, userId) {
  return SessionPlayer.findOne({ where: { session_id: sessionId, player_id: userId } });
}

function countBySession(sessionId) {
  return SessionPlayer.count({ where: { session_id: sessionId } });
}

function markSeen(sessionPlayerId) {
  return SessionPlayer.update(
    { last_seen_at: new Date() },
    { where: { session_player_id: sessionPlayerId } }
  );
}

function findRunningSeatElsewhere(userId, sessionId) {
  return SessionPlayer.findOne({
    where: {
      player_id: userId,
      session_id: { [Op.ne]: sessionId }
    },
    include: {
      model: TournamentSession,
      where: { status: 'RUNNING' }
    }
  });
}

function create(data) {
  return SessionPlayer.create(data);
}

function listBySession(sessionId) {
  return SessionPlayer.findAll({
    where: { session_id: sessionId },
    attributes: ['nickname', 'score'],
    order: [['session_player_id', 'ASC']]
  });
}

module.exports = { findSeat, countBySession, markSeen, findRunningSeatElsewhere, create, listBySession };
