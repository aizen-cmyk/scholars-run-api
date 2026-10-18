'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const runs = [];

    for (let playerId = 1; playerId <= 5; playerId += 1) {
      const firstRunId = (playerId - 1) * 3 + 1;
      runs.push(
        {
          run_id: firstRunId,
          session_id: 1,
          player_id: playerId,
          energy: 3,
          score: 120 + playerId * 10,
          final_score: 120 + playerId * 10,
          status: 'completed',
          created_at: now,
          updated_at: now
        },
        {
          run_id: firstRunId + 1,
          session_id: 1,
          player_id: playerId,
          energy: 0,
          score: 40 + playerId * 5,
          final_score: null,
          status: 'lost',
          created_at: now,
          updated_at: now
        },
        {
          run_id: firstRunId + 2,
          session_id: 1,
          player_id: playerId,
          energy: 4,
          score: 0,
          final_score: null,
          status: 'abandoned',
          created_at: now,
          updated_at: now
        }
      );
    }

    await queryInterface.bulkInsert('runs', runs);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('runs', null, {});
  }
};
