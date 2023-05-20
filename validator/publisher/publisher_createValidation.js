const { body } = require('express-validator');

const db = require('../../model/db_config');
const Publisher = db.publisher;

module.exports = [
  body('publishername')
      .not().isEmpty().withMessage(`Publisher can't empty`)
      .custom(async publishername => {
        const publisher = await Publisher.findOne({ where: { name: publishername } })
        if (publisher) {
          return Promise.reject("Publisher already exist")
        }
      })
]