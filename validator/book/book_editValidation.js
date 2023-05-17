const { body } = require('express-validator');

const db = require('../../model/db_config');

module.exports = [
  body('name')
      .not().isEmpty().withMessage(`Book name can't be empty`)
      .trim()
  ,
  body('publish')
      .not().isEmpty().withMessage(`Publish date can't be empty`)
  ,
  body('baseprice')
      .not().isEmpty().withMessage(`Base price can't be empty`)
  ,
  body('publisher')
      .not().isEmpty().withMessage(`Publisher can't be empty`)
]