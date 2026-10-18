'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('players', [
      { player_id: 1, name: 'Player One', created_at: now, updated_at: now },
      { player_id: 2, name: 'Player Two', created_at: now, updated_at: now },
      { player_id: 3, name: 'Player Three', created_at: now, updated_at: now },
      { player_id: 4, name: 'Player Four', created_at: now, updated_at: now },
    ], { ignoreDuplicates: true });
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('players', null, {});
  }
};