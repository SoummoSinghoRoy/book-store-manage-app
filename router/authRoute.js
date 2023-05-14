const router = require('express').Router()

const { signupPostController } = require('../controller/authController');
const signupValidation = require('../validator/auth/signupValidation');

router.post('/signup', signupValidation, signupPostController);
router.post('/login');

module.exports = router;