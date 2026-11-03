const { TournamentSession } = require('../models');

function findByCode(code) {
  return TournamentSession.findOne({ where: { code } });
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

module.exports = { findByCode, findById, create, update, remove };
