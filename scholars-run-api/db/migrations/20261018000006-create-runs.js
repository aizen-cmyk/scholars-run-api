'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('runs', {
      run_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      player_id: { type: DataTypes.INTEGER, allowNull: false },
      energy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
      score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      final_score: { type: DataTypes.INTEGER, allowNull: true },
      status: { type: DataTypes.STRING(20), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('runs', {
      fields: ['session_id'],
      type: 'foreign key',
      name: 'fk_runs_session',
      references: { table: 'tournament_sessions', field: 'session_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('runs', {
      fields: ['player_id'],
      type: 'foreign key',
      name: 'fk_runs_player',
      references: { table: 'players', field: 'player_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
    await queryInterface.addConstraint('runs', {
      fields: ['score'],
      type: 'check',
      name: 'ck_runs_score_nonnegative',
      where: { score: { [Op.gte]: 0 } }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('runs');
  }
};
