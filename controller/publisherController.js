const { validationResult } = require('express-validator');

const { serverError, resourceError } = require('../utils/error');
const db = require('../model/db_config');
const Publisher = db.publisher;

exports.publisherAllGetController = async (req, res) => {
  try {
    const publishers = await Publisher.findAll()
    if (publishers.length !== 0) {
      res.status(200).json(publishers)
    } else {
      resourceError(res, "Publishers not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.publisherAddPostController = async (req, res) => {
  const { publishername } = req.body;
  const errors = validationResult(req).formatWith(err => err.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }
  
  try {
    const registered_publisher = await Publisher.create({ name: publishername })
    res.status(200).json({
      Message: "Publisher created successfully",
      registered_publisher
    })
  } catch (error) {
    serverError(res, error)
  }
}

exports.publisherEditPutController = async (req, res) => {
  const { publishername } = req.body;
  const { publisherid } = req.params;
  const errors = validationResult(req).formatWith(err => err.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }

  try {
    const current_publisher = await Publisher.findOne({ where: { id: publisherid } })
    if (current_publisher) {
      await Publisher.update({ name: publishername }, { where: { id: current_publisher.id } })
      const updated_publisher = await Publisher.findOne({ where: { id: publisherid } })
      res.status(200).json({
        Message: "Publisher updated successfully",
        updated_publisher
      })
    } else {
      resourceError(res, "Publisher not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}

exports.publisherDeleteController = async (req, res) => {
  const { publisherid } = req.params;

  try {
    const publisher = await Publisher.findOne({ where: { id: publisherid } })
    if (publisher) {
      await Publisher.destroy({ where: { id: publisher.id } })
      res.status(200).json({
        Message: "Publisher deleted successfully",
        deleted_publisher: publisher
      })
    } else {
      resourceError(res, "Publisher not found")
    }
  } catch (error) {
    serverError(res, error)
  }
}