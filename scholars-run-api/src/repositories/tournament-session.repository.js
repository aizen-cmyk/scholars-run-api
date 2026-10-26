const { TournamentSession } = require('../models');

function findAll() {
  return TournamentSession.findAll({ order: [['session_id', 'ASC']] });
}

function findAllByHost(hostId) {
  return TournamentSession.findAll({
    where: { host_id: hostId },
    order: [['session_id', 'ASC']]
  });
}

function findById(id) {
  return TournamentSession.findByPk(id);
}

function create(data) {
  return TournamentSession.create(data);
}

function update(row, changes) {
  return row.update(changes);
}

function remove(row) {
  return row.destroy();
}

module.exports = { findAll, findAllByHost, findById, create, update, remove };
