'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('players', [
      { player_id: 1, name: 'Ari Santos', created_at: now, updated_at: now },
      { player_id: 2, name: 'Bea Villanueva', created_at: now, updated_at: now },
      { player_id: 3, name: 'Carlo Mendoza', created_at: now, updated_at: now },
      { player_id: 4, name: 'Dani Flores', created_at: now, updated_at: now },
      { player_id: 5, name: 'Emil Garcia', created_at: now, updated_at: now }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('players', null, {});
  }
};
