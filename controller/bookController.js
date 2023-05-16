const { validationResult } = require('express-validator');

const { serverError } = require('../utils/error');
const db = require('../model/db_config');
const Book = db.book;
const Publisher = db.publisher;

exports.bookAllGetController = (req, res) => {}

exports.bookAddPostController = async (req, res) => {
  const { name, publish, baseprice, publisher } = req.body;
  const errors = validationResult(req).formatWith(err => err.msg)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }
  try {
    const publishername = await Publisher.findOne({ where: { id: parseInt(publisher) } })
    const book_publisher = publishername;
    const book = await Book.create({ name, publish, baseprice })
    await book.setPublisher(book_publisher)

    res.status(200).json({
      Message: "Book added successfully",
      book
    })
  } catch (error) {
    serverError(res, error)
  }
}

exports.bookEditPutController = (req, res) => {}

exports.bookDeleteController = (req, res) => {}