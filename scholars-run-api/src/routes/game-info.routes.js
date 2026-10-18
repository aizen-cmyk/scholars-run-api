const express = require('express');
const gameInfoController = require('../controllers/game-info.controller');

const router = express.Router();
router.get('/', gameInfoController.getGameInfo);

module.exports = router;
