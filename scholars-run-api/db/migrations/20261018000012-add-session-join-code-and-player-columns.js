'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    // Join code and session lifecycle timestamps on the session (tournament_sessions) table.
    await queryInterface.addColumn('tournament_sessions', 'code', {
      type: DataTypes.STRING(6),
      allowNull: true
    });
    await queryInterface.addColumn('tournament_sessions', 'started_at', {
      type: DataTypes.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('tournament_sessions', 'ended_at', {
      type: DataTypes.DATE,
      allowNull: true
    });
    await queryInterface.addConstraint('tournament_sessions', {
      fields: ['code'],
      type: 'unique',
      name: 'uq_tournament_sessions_code'
    });

    // Per-player seat columns on the session_players table.
    await queryInterface.addColumn('session_players', 'nickname', {
      type: DataTypes.STRING(100),
      allowNull: true
    });
    await queryInterface.addColumn('session_players', 'score', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('session_players', 'last_seen_at', {
      type: DataTypes.DATE,
      allowNull: true
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['session_id', 'nickname'],
      type: 'unique',
      name: 'uq_session_players_session_nickname'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('session_players', 'uq_session_players_session_nickname');
    await queryInterface.removeColumn('session_players', 'last_seen_at');
    await queryInterface.removeColumn('session_players', 'score');
    await queryInterface.removeColumn('session_players', 'nickname');
    await queryInterface.removeConstraint('tournament_sessions', 'uq_tournament_sessions_code');
    await queryInterface.removeColumn('tournament_sessions', 'ended_at');
    await queryInterface.removeColumn('tournament_sessions', 'started_at');
    await queryInterface.removeColumn('tournament_sessions', 'code');
  }
};
