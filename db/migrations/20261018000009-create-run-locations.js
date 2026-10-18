'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('run_locations', {
      run_location_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      run_id: { type: DataTypes.INTEGER, allowNull: false },
      location_id: { type: DataTypes.INTEGER, allowNull: false },
      sequence_number: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('run_locations', {
      fields: ['run_id'],
      type: 'foreign key',
      name: 'fk_run_locations_run',
      references: { table: 'runs', field: 'run_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('run_locations', {
      fields: ['location_id'],
      type: 'foreign key',
      name: 'fk_run_locations_location',
      references: { table: 'locations', field: 'location_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
    await queryInterface.addConstraint('run_locations', {
      fields: ['run_id', 'sequence_number'],
      type: 'unique',
      name: 'uq_run_locations_run_sequence'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('run_locations');
  }
};
