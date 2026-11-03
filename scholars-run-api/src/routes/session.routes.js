const express = require('express');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');
const {
  startRules,
  statusRules,
  codeParam,
  nicknameRules
} = require('../validators/session.validator');
const { start, read, changeStatus } = require('../controllers/session.controller');
const { joinOrRejoin, listPlayers } = require('../controllers/player.controller');

const router = express.Router();

router.post('/', requireUser('HOST', 'ADMIN'), startRules, validate, start);
router.get('/:code', codeParam, validate, read);
router.patch('/:code', requireUser('HOST', 'ADMIN'), codeParam, statusRules, validate, changeStatus);
router.post('/:code/players', requireUser(), codeParam, nicknameRules, validate, joinOrRejoin);
router.get('/:code/players', codeParam, validate, listPlayers);

module.exports = router;
