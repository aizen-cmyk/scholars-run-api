const { matchedData } = require('express-validator');
const tournamentSessionService = require('../services/tournament-session.service');

const list = async (req, res) => {
  const sessions = await tournamentSessionService.list(req.user);
  res.status(200).json(sessions.map((row) => row.toJson()));
};

const get = async (req, res) => {
  const session = await tournamentSessionService.get(Number(req.params.id), req.user);
  res.status(200).json(session.toJson());
};

const create = async (req, res) => {
  const data = matchedData(req);
  const session = await tournamentSessionService.create(data, req.user);
  res.status(201).json(session.toJson());
};

const update = async (req, res) => {
  const data = matchedData(req);
  const session = await tournamentSessionService.update(Number(req.params.id), data, req.user);
  res.status(200).json(session.toJson());
};

const remove = async (req, res) => {
  await tournamentSessionService.remove(Number(req.params.id), req.user);
  res.status(204).end();
};

module.exports = { list, get, create, update, remove };
