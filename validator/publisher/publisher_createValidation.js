const { body } = require('express-validator');

const db = require('../../model/db_config');
const Publisher = db.publisher;

module.exports = [
  body('name')
      .not().isEmpty().withMessage(`Publisher can't empty`)
      .custom(async name => {
        const publisher = await Publisher.findOne({ where: { name } })
        if (publisher) {
          return Promise.reject("Publisher already exist")
        }
      })
]