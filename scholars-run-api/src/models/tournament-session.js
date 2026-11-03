// Model = the JavaScript view of ONE table. Column rules live in the migration;
// the model only tells Sequelize how to read and write the table.
module.exports = (sequelize, DataTypes) => {
  const TournamentSession = sequelize.define(
    'TournamentSession',
    {
      session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      host_id: { type: DataTypes.INTEGER, allowNull: false },
      code: { type: DataTypes.STRING(6), allowNull: true, unique: true },
      status: { type: DataTypes.STRING(20), allowNull: false },
      max_players: { type: DataTypes.INTEGER, allowNull: false },
      started_at: { type: DataTypes.DATE, allowNull: true },
      ended_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: 'tournament_sessions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  TournamentSession.prototype.toJson = function toJson() {
    return {
      session_id: this.session_id,
      host_id: this.host_id,
      code: this.code,
      status: this.status,
      max_players: this.max_players,
      started_at: this.started_at,
      ended_at: this.ended_at,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  };

  return TournamentSession;
};
