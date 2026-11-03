const express = require('express');
const { getResults } = require('../controllers/results.controller');

const router = express.Router();
router.get('/', getResults);

module.exports = router;
