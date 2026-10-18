'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const pairs = [
      [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8],
      [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]
    ];
    await queryInterface.bulkInsert('location_routes', pairs.map(([fromId, toId], index) => ({
      location_route_id: index + 1,
      from_location_id: fromId,
      to_location_id: toId,
      created_at: now,
      updated_at: now
    })));

    const tables = [
      ['hosts', 'host_id'],
      ['players', 'player_id'],
      ['locations', 'location_id'],
      ['tournament_sessions', 'session_id'],
      ['session_players', 'session_player_id'],
      ['runs', 'run_id'],
      ['questions', 'question_id'],
      ['question_choices', 'choice_id'],
      ['run_locations', 'run_location_id'],
      ['location_routes', 'location_route_id']
    ];
    for (const [table, primaryKey] of tables) {
      await queryInterface.sequelize.query(
        `SELECT setval(pg_get_serial_sequence('"${table}"', '${primaryKey}'), COALESCE(MAX("${primaryKey}"), 1), MAX("${primaryKey}") IS NOT NULL) FROM "${table}"`
      );
    }
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('location_routes', null, {});
  }
};
