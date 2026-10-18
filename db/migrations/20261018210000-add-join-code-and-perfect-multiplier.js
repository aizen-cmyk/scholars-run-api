'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tournament_sessions', 'join_code', {
      type: Sequelize.STRING(6),
      allowNull: true,
    });
    await queryInterface.addColumn('locations', 'perfect_multiplier', {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 1.0,
    });
    await queryInterface.renameColumn('runs', 'player_id', 'user_id');
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('tournament_sessions', 'join_code');
    await queryInterface.removeColumn('locations', 'perfect_multiplier');
    await queryInterface.renameColumn('runs', 'user_id', 'player_id');
  }
};