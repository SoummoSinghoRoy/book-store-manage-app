const { body } = require('express-validator');

module.exports = [
  body('email')
      .not().isEmpty().withMessage('Must use valid username')
  ,
  body('password')
      .not().isEmpty().withMessage('Must use valid password')
]