const { Host, Player } = require('../models');

// Finds an account by host_id (hosts) or player_id (players). This repo has no
// single `users` table, so the id space is shared by convention.
async function findById(id) {
  const host = await Host.findByPk(id);
  if (host) return { user_id: host.host_id, role: 'HOST' };
  const player = await Player.findByPk(id);
  if (player) return { user_id: player.player_id, role: 'PLAYER' };
  return null;
}

module.exports = { findById };
