'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('session_players', {
      session_player_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      player_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['session_id'],
      type: 'foreign key',
      name: 'fk_session_players_session',
      references: { table: 'tournament_sessions', field: 'session_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['player_id'],
      type: 'foreign key',
      name: 'fk_session_players_player',
      references: { table: 'players', field: 'player_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['session_id', 'player_id'],
      type: 'unique',
      name: 'uq_session_players_session_player'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('session_players');
  }
};
