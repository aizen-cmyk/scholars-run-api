const { body, param } = require('express-validator');

const startRules = [
  body('max_players')
    .optional({ values: 'null' })
    .isInt({ min: 2, max: 10 })
    .withMessage('max_players must be a whole number between 2 and 10')
    .toInt()
];

const statusRules = [
  body('status')
    .exists()
    .withMessage('status is required')
    .bail()
    .isIn(['RUNNING', 'CLOSED'])
    .withMessage('status must be one of: RUNNING, CLOSED')
];

const codeParam = param('code')
  .matches(/^[1-9][0-9]{5}$/)
  .withMessage('the join code must be six digits');

const nicknameRules = [
  body('nickname')
    .exists()
    .withMessage('nickname is required')
    .bail()
    .isString()
    .withMessage('nickname must be text')
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('nickname must be between 2 and 100 characters')
];

module.exports = { startRules, statusRules, codeParam, nicknameRules };
