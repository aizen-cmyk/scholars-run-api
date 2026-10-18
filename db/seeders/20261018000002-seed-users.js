'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('users', [
      { user_id: 1, school_id: '20990001', full_name: 'Player One', email: 'player.one@test.com', role: 'player', created_at: now, updated_at: now },
      { user_id: 2, school_id: '20990002', full_name: 'Player Two', email: 'player.two@test.com', role: 'player', created_at: now, updated_at: now },
      { user_id: 3, school_id: '20990003', full_name: 'Player Three', email: 'player.three@test.com', role: 'player', created_at: now, updated_at: now },
      { user_id: 4, school_id: '20990004', full_name: 'Player Four', email: 'player.four@test.com', role: 'player', created_at: now, updated_at: now },
      { user_id: 5, school_id: '20990005', full_name: 'Player Five', email: 'player.five@test.com', role: 'player', created_at: now, updated_at: now },
    ], { ignoreDuplicates: true });
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};