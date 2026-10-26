const { matchedData } = require('express-validator');
const sessionService = require('../services/session.service');

const start = async (req, res) => {
  const data = matchedData(req);
  const session = await sessionService.create(data, req.user);
  res.status(201).json(session.toJson());
};

const read = async (req, res) => {
  const session = await sessionService.findOrFail(req.params.code);
  res.status(200).json(session.toJson());
};

const changeStatus = async (req, res) => {
  const data = matchedData(req);
  const session = await sessionService.changeStatus(req.params.code, data.status, req.user);
  res.status(200).json(session.toJson());
};

module.exports = { start, read, changeStatus };
