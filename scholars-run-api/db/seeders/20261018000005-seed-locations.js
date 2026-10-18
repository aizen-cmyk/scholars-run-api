'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('locations', [
      { location_id: 1, name: 'Admin Building', energy_reward: 0, created_at: now, updated_at: now },
      { location_id: 2, name: 'Manggahan', energy_reward: 1, created_at: now, updated_at: now },
      { location_id: 3, name: 'Clinic', energy_reward: 1, created_at: now, updated_at: now },
      { location_id: 4, name: 'Library', energy_reward: 2, created_at: now, updated_at: now },
      { location_id: 5, name: 'ICT', energy_reward: 0, created_at: now, updated_at: now },
      { location_id: 6, name: 'CICT', energy_reward: 0, created_at: now, updated_at: now },
      { location_id: 7, name: 'BME', energy_reward: 0, created_at: now, updated_at: now },
      { location_id: 8, name: 'Social Hall', energy_reward: 0, created_at: now, updated_at: now }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('locations', null, {});
  }
};
