// Model = the JavaScript view of ONE table. Column rules live in the migration;
// the model only tells Sequelize how to read and write the table.
module.exports = (sequelize, DataTypes) => {
  const SessionPlayer = sequelize.define(
    'SessionPlayer',
    {
      session_player_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      player_id: { type: DataTypes.INTEGER, allowNull: false },
      nickname: { type: DataTypes.STRING(100), allowNull: true },
      score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      last_seen_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: 'session_players',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  SessionPlayer.prototype.toJson = function toJson() {
    return {
      player_id: this.session_player_id,
      session_id: this.session_id,
      user_id: this.player_id,
      nickname: this.nickname,
      score: this.score,
      last_seen_at: this.last_seen_at,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  };

  return SessionPlayer;
};
