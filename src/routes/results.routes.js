'use strict';

const { Router } = require('express');
const controller = require('../controllers/results.controller');

const router = Router();

router.get('/', controller.getResults);

module.exports = router;