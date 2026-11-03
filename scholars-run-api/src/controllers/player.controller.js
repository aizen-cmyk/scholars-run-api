const { matchedData } = require('express-validator');
const playerService = require('../services/player.service');

const joinOrRejoin = async (req, res) => {
  const data = matchedData(req);
  const result = await playerService.joinOrRejoin(req.params.code, req.user.user_id, data.nickname);
  const status = result.rejoined ? 200 : 201;
  res.status(status).json({
    player_id: result.seat.session_player_id,
    nickname: result.seat.nickname,
    score: result.seat.score,
    rejoined: result.rejoined,
    session: {
      code: result.session.code,
      status: result.session.status
    }
  });
};

const listPlayers = async (req, res) => {
  const players = await playerService.listPlayers(req.params.code);
  res.status(200).json(players.map((p) => p.toJson()));
};

module.exports = { joinOrRejoin, listPlayers };
