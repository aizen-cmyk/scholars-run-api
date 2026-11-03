// Model = the JavaScript view of ONE table. Column rules live in the migration;
// the model only tells Sequelize how to read and write the table.
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Player',
    {
      player_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
    },
    { tableName: 'players', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
  );
