const { validationResult } = require('express-validator');


exports.signupPostController = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const errors = validationResult(req).formatWith(err => err.msg)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    })
  }
}