'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('session_players', [
      { session_player_id: 1, session_id: 1, user_id: 1, created_at: now, updated_at: now },
      { session_player_id: 2, session_id: 1, user_id: 2, created_at: now, updated_at: now },
      { session_player_id: 3, session_id: 1, user_id: 3, created_at: now, updated_at: now },
      { session_player_id: 4, session_id: 1, user_id: 4, created_at: now, updated_at: now },
      { session_player_id: 5, session_id: 1, user_id: 5, created_at: now, updated_at: now },
    ], { ignoreDuplicates: true });
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('session_players', null, {});
  }
};