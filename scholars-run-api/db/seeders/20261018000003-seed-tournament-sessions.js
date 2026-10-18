'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('tournament_sessions', [
      {
        session_id: 1,
        host_id: 1,
        status: 'available',
        max_players: 10,
        created_at: now,
        updated_at: now
      }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('tournament_sessions', null, {});
  }
};
