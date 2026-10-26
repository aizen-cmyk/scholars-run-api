const { body, param } = require('express-validator');

const createRules = [
  body('status')
    .exists()
    .withMessage('status is required')
    .bail()
    .isString()
    .withMessage('status must be text')
    .bail()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('status must be between 1 and 20 characters'),
  body('max_players')
    .exists()
    .withMessage('max_players is required')
    .bail()
    .isInt({ min: 2, max: 10 })
    .withMessage('max_players must be a whole number between 2 and 10')
    .toInt()
];

const updateRules = [
  body('status')
    .optional({ values: 'null' })
    .isString()
    .withMessage('status must be text')
    .bail()
    .trim()
    .isLength({ max: 20 })
    .withMessage('status must be at most 20 characters'),
  body('max_players')
    .optional({ values: 'null' })
    .isInt({ min: 2, max: 10 })
    .withMessage('max_players must be a whole number between 2 and 10')
    .toInt(),
  body()
    .custom((value) => {
      if (!value || Object.keys(value).length === 0) {
        throw new Error('send at least one of: status, max_players');
      }
      return true;
    })
    .withMessage('send at least one of: status, max_players')
];

const idParam = param('id')
  .isInt({ min: 1 })
  .withMessage('id must be a whole number of 1 or greater')
  .toInt();

module.exports = { createRules, updateRules, idParam };
