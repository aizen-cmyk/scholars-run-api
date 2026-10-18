'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('locations', {
      location_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      name: { type: DataTypes.STRING(100), allowNull: false },
      energy_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('locations');
  }
};
