const gameInfo = require('../config/game-info');

const getGameInfo = (req, res) => {
  res.status(200).json(gameInfo);
};

module.exports = { getGameInfo };
