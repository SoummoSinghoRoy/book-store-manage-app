const { validationResult } = require('express-validator');

const { serverError, resourceError } = require('../utils/error');
const db = require('../model/db_config');
const Book = db.book;
const Publisher = db.publisher;

exports.bookAllGetController = async (req, res) => {
  const { page } = req.query;
  const currentPage = parseInt(page) || 1;
  const booksPerPage = 30

  try {
    const offset = (currentPage - 1) * booksPerPage
    const books = await Book.findAndCountAll(
      { 
        include: Publisher,
        offset,
        limit: booksPerPage 
      }
    )
    const totalPages = Math.ceil(books.count / booksPerPage)

    if(books.rows.length !== 0) {
      res.status(200).json({
        books: books.rows,
        totalPages,
        currentPage,
        booksPerPage,
        offset
      })
    } else {
      resourceError(res, "Books not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.bookAddPostController = async (req, res) => {
  const { name, publish, baseprice, publisher } = req.body;
  const errors = validationResult(req).formatWith(err => err.msg)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }
  try {
    const publisherid = parseInt(publisher)
    const bookPublisher = await Publisher.findOne({ where: { id: publisherid } })
    // use eager loading method
    const book = await Book.create(
      { name, publish, baseprice, PublisherId: bookPublisher.id }, 
      { include: [Publisher] }
    )

    res.status(200).json({
      Message: "Book added successfully",
      book
    })
  } catch (error) {
    serverError(res, error)
  }
}

exports.bookEditPutController = async (req, res) => {
  const { name, publish, baseprice, publisher } = req.body;
  const { bookid } = req.params;
  const errors = validationResult(req).formatWith(err => err.msg)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }
  try {
    const book = await Book.findOne({ where: { id: bookid } })

    if(book) {
      const book_publisher = await Publisher.findOne({ where: { id: parseInt(publisher) } })
      await Book.update({ name, publish, baseprice, PublisherId: book_publisher.id }, { where: { id: book.id }, include: [Publisher] })
      const updated_book = await Book.findOne({ where: { id: bookid }, include: Publisher })
      res.status(200).json({
        Message: "Book updated successfully",
        updated_book
      })
    } else {
      resourceError(res, "Book not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.bookDeleteController = async (req, res) => {
  const { bookid } = req.params;
  try {
    const book = await Book.findOne({ where: { id: bookid } })
    if(book) {
      await Book.destroy({ where: { id: book.id } })
      res.status(200).json({
        Message: "Book deleted successfully",
        deleted_book: book
      })
    }else {
      resourceError(res, "Book not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}