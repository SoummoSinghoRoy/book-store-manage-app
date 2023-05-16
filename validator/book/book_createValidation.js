const { body } = require('express-validator');

const db = require('../../model/db_config');
const Book = db.book;


module.exports = [
  body('name')
      .not().isEmpty().withMessage(`Book name can't be empty`)
      .trim()
      .custom(async name => {
        const book = await Book.findOne({ where: { name } })
        if(book) {
          return Promise.reject('Book already exist')
        }
      })
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