const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const { resourceError, serverError } = require('../utils/error');
const db = require('../model/db_config');
const User = db.user;

exports.signupPostController = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req).formatWith(err => err.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }

  try {
    const registered_user = await User.create({
      username, email, password
    })
    res.status(200).json({
      Message: "User created successfull",
      registered_user
    })
  } catch (error) {
    serverError(res, error)
  }
}

exports.loginPostController = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req).formatWith(err => err.msg)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      resourceError(res, "User not found")
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return serverError(res, err)
        }
        if (!result) {
          return resourceError(res, "Incorrect password")
        }
        const token = jwt.sign({
          username: user.username,
          email: user.email
        }, config.get('secret'), { expiresIn: "10h" })

        res.status(200).json({
          Message: "Successfully logged in",
          token: `Bearer ${token}`
        })
      })
    }
  } catch (error) {
    serverError(res, error)
  }
}