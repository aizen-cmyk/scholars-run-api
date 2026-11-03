const express = require('express');
const requireUser = require('../middlewares/require-user');
const validate = require('../middlewares/validate');
const { createRules, updateRules, idParam } = require('../validators/tournament-session.validator');
const {
  list,
  get,
  create,
  update,
  remove
} = require('../controllers/tournament-session.controller');

const router = express.Router();

router.use(requireUser('HOST', 'ADMIN'));

router.get('/', list);
router.get('/:id', idParam, validate, get);
router.post('/', createRules, validate, create);
router.patch('/:id', idParam, updateRules, validate, update);
router.delete('/:id', idParam, validate, remove);

module.exports = router;
