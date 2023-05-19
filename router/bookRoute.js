const router = require('express').Router()

const { bookAllGetController, bookAddPostController, bookEditPutController, bookDeleteController } = require('../controller/bookController');
const book_createValidation = require('../validator/book/book_createValidation');
const book_editValidation = require('../validator/book/book_editValidation');
const passport = require('../middleware/passport');
const isAuthenticated = passport.authenticate('jwt', { session: false });

router.get('/', isAuthenticated, bookAllGetController);
router.post('/add-new', isAuthenticated, book_createValidation, bookAddPostController);
router.put('/edit/:bookid', isAuthenticated, book_editValidation, bookEditPutController);
router.delete('/delete/:bookid', isAuthenticated, bookDeleteController);

module.exports = router;