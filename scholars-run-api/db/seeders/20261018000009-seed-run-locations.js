'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rows = [];
    let runLocationId = 1;

    for (let playerIndex = 0; playerIndex < 5; playerIndex += 1) {
      const completedRunId = playerIndex * 3 + 1;
      const lostRunId = completedRunId + 1;

      [1, 2, 4, 6].forEach((locationId, index) => {
        rows.push({
          run_location_id: runLocationId,
          run_id: completedRunId,
          location_id: locationId,
          sequence_number: index + 1,
          created_at: now,
          updated_at: now
        });
        runLocationId += 1;
      });
      [1, 3].forEach((locationId, index) => {
        rows.push({
          run_location_id: runLocationId,
          run_id: lostRunId,
          location_id: locationId,
          sequence_number: index + 1,
          created_at: now,
          updated_at: now
        });
        runLocationId += 1;
      });
    }

    await queryInterface.bulkInsert('run_locations', rows);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('run_locations', null, {});
  }
};
