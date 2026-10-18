'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('question_choices', {
      choice_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      question_id: { type: DataTypes.INTEGER, allowNull: false },
      choice_text: { type: DataTypes.STRING(255), allowNull: false },
      choice_order: { type: DataTypes.INTEGER, allowNull: false },
      is_correct: { type: DataTypes.BOOLEAN, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') }
    });
    await queryInterface.addConstraint('question_choices', {
      fields: ['question_id'],
      type: 'foreign key',
      name: 'fk_question_choices_question',
      references: { table: 'questions', field: 'question_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addConstraint('question_choices', {
      fields: ['question_id', 'choice_order'],
      type: 'unique',
      name: 'uq_question_choices_question_order'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('question_choices');
  }
};
