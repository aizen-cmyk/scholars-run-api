const express = require('express');
const healthRoutes = require('./health.routes');
const gameInfoRoutes = require('./game-info.routes');

const router = express.Router();
router.use('/health', healthRoutes);
router.use('/game-info', gameInfoRoutes);

module.exports = router;
