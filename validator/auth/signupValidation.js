const { body } = require('express-validator');

const db = require('../../model/db_config');
const User = db.user;

module.exports = [
  body('username')
      .trim()
      .custom(async username => {
        const user = await User.findOne({ where: { username } })
        if(user) {
          return Promise.reject("Username already exist")
        }
      })
  ,
  body('email')
      .isEmail().withMessage("Email must be valid")
      .normalizeEmail()
      .custom(async email => {
        const user = await User.findOne({ where: { email } })
        if(user) {
          return Promise.reject("Email already exist")
        }
      })
  ,
  body('password')
      .not().isEmpty().withMessage(`Password can't be empty`)
      .isLength({min: 5, max: 10}).withMessage(`Password length should be between 5 to 10 characters.`)
  ,
  body('confirmPassword')
      .not().isEmpty().withMessage(`Confirm password can't be empty`)
      .custom((confirmPassword, {req}) => {
        if(confirmPassword !== req.body.password) {
          throw new Error(`Password doesn't match`)
        }
        return true
      })
]