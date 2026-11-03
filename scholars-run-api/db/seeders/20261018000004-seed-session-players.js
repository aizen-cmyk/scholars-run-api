'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('session_players', [1, 2, 3, 4, 5].map((playerId, index) => ({
      session_player_id: index + 1,
      session_id: 1,
      player_id: playerId,
      created_at: now,
      updated_at: now
    })));
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('session_players', null, {});
  }
};
