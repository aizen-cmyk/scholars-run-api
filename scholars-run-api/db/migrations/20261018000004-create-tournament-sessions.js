'use strict';

const { DataTypes, Op, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('tournament_sessions', {
      session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      host_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING(20), allowNull: false },
      max_players: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('tournament_sessions', {
      fields: ['host_id'],
      type: 'foreign key',
      name: 'fk_tournament_sessions_host',
      references: { table: 'hosts', field: 'host_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
    await queryInterface.addConstraint('tournament_sessions', {
      fields: ['max_players'],
      type: 'check',
      name: 'ck_tournament_sessions_max_players',
      where: { max_players: { [Op.between]: [2, 10] } }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('tournament_sessions');
  }
};
