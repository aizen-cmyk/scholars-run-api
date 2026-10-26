'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('hosts', [
      { host_id: 2, name: 'Jason Lim', created_at: now, updated_at: now }
    ]);
    await queryInterface.bulkInsert('players', [
      { player_id: 6, name: 'Felix Cruz', created_at: now, updated_at: now },
      { player_id: 7, name: 'Gina Dela Cruz', created_at: now, updated_at: now }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('hosts', { host_id: 2 }, {});
    await queryInterface.bulkDelete('players', { player_id: [6, 7] }, {});
  }
};
