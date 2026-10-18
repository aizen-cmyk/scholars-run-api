'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('location_routes', {
      location_route_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      from_location_id: { type: DataTypes.INTEGER, allowNull: false },
      to_location_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('location_routes', {
      fields: ['from_location_id'],
      type: 'foreign key',
      name: 'fk_location_routes_from_location',
      references: { table: 'locations', field: 'location_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('location_routes', {
      fields: ['to_location_id'],
      type: 'foreign key',
      name: 'fk_location_routes_to_location',
      references: { table: 'locations', field: 'location_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('location_routes', {
      fields: ['from_location_id', 'to_location_id'],
      type: 'unique',
      name: 'uq_location_routes_pair'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('location_routes');
  }
};
