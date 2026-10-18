'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const runs = [];

    for (let userId = 1; userId <= 5; userId += 1) {
      const firstRunId = (userId - 1) * 3 + 1;
      runs.push(
        {
          run_id: firstRunId,
          session_id: 1,
          user_id: userId,
          energy: 7,
          score: 960,
          final_score: 1632,
          status: 'completed',
          created_at: now,
          updated_at: now
        },
        {
          run_id: firstRunId + 1,
          session_id: 1,
          user_id: userId,
          energy: 0,
          score: 120,
          final_score: null,
          status: 'lost',
          created_at: now,
          updated_at: now
        },
        {
          run_id: firstRunId + 2,
          session_id: 1,
          user_id: userId,
          energy: 3,
          score: 260,
          final_score: null,
          status: 'active',
          created_at: now,
          updated_at: now
        }
      );
    }

    await queryInterface.bulkInsert('runs', runs, { ignoreDuplicates: true });
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('runs', null, {});
  }
};