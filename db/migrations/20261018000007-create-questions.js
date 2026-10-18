'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('questions', {
      question_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      location_id: { type: DataTypes.INTEGER, allowNull: false },
      question_text: { type: DataTypes.TEXT, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('questions', {
      fields: ['location_id'],
      type: 'foreign key',
      name: 'fk_questions_location',
      references: { table: 'locations', field: 'location_id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('questions');
  }
};
