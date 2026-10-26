const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const env = require('../config/env');

const sequelize = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  {
    host: env.database.host,
    port: env.database.port,
    dialect: 'postgres',
    logging: false
  }
);

const Host = require('./host')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);
const TournamentSession = require('./tournament-session')(sequelize, DataTypes);

Host.hasMany(TournamentSession, { foreignKey: 'host_id' });
TournamentSession.belongsTo(Host, { foreignKey: 'host_id' });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  Host,
  Player,
  TournamentSession
};
