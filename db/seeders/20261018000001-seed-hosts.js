'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('hosts', [
      { host_id: 1, name: 'Mikaela Reyes', created_at: now, updated_at: now },
    ], { ignoreDuplicates: true });
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('hosts', null, {});
  }
};