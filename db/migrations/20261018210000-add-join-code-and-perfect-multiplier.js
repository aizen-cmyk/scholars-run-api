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
    // Drop old FK, rename column, add new FK to users
    await queryInterface.removeConstraint('runs', 'fk_runs_player');
    await queryInterface.renameColumn('runs', 'player_id', 'user_id');
    await queryInterface.addConstraint('runs', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_runs_user',
      references: { table: 'users', field: 'user_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('runs', 'fk_runs_user');
    await queryInterface.renameColumn('runs', 'user_id', 'player_id');
    await queryInterface.addConstraint('runs', {
      fields: ['player_id'],
      type: 'foreign key',
      name: 'fk_runs_player',
      references: { table: 'players', field: 'player_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
    await queryInterface.removeColumn('tournament_sessions', 'join_code');
    await queryInterface.removeColumn('locations', 'perfect_multiplier');
  }
};