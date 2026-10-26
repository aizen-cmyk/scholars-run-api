const { notFound, forbidden, conflict } = require('../errors/app-error');
const tournamentSessionRepository = require('../repositories/tournament-session.repository');
const playerRepository = require('../repositories/player.repository');

function findOrFail(id) {
  return tournamentSessionRepository.findById(id).then((row) => {
    if (!row) throw notFound('TOURNAMENT_SESSION_NOT_FOUND', 'No tournament session with that id.');
    return row;
  });
}

function isOwner(row, user) {
  return row.host_id === user.user_id || user.role === 'ADMIN';
}

function list(user) {
  if (user.role === 'ADMIN') {
    return tournamentSessionRepository.findAll();
  }
  return tournamentSessionRepository.findAllByHost(user.user_id);
}

function get(id, user) {
  return findOrFail(id).then((row) => {
    if (isOwner(row, user)) return row;
    throw forbidden('This tournament session belongs to another host.');
  });
}

function create(data, user) {
  const sessionData = { ...data, host_id: user.user_id };
  return tournamentSessionRepository.create(sessionData);
}

function updateSession(id, changes, user) {
  return findOrFail(id).then((row) => {
    if (!isOwner(row, user)) {
      throw forbidden('This tournament session belongs to another host.');
    }
    return tournamentSessionRepository.update(row, changes);
  });
}

async function removeSession(id, user) {
  const row = await findOrFail(id);
  if (!isOwner(row, user)) {
    throw forbidden('This tournament session belongs to another host.');
  }
  const taken = await playerRepository.countBySession(row.session_id);
  if (taken > 0) {
    throw conflict('TOURNAMENT_SESSION_IN_USE', 'This tournament session is used in a game and cannot be deleted.');
  }
  return tournamentSessionRepository.remove(row);
}

module.exports = {
  findOrFail,
  isOwner,
  list,
  get,
  create,
  update: updateSession,
  remove: removeSession
};
