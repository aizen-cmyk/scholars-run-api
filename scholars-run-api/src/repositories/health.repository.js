const { sequelize } = require('../models');

const ping = async () => sequelize.authenticate();

module.exports = { ping };
