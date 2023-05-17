const router = require('express').Router()

const { bookAllGetController, bookAddPostController, bookEditPutController, bookDeleteController } = require('../controller/bookController');
const book_createValidation = require('../validator/book/book_createValidation');
const book_editValidation = require('../validator/book/book_editValidation');

router.get('/', bookAllGetController);
router.post('/add-new', book_createValidation, bookAddPostController);
router.put('/edit/:bookid', book_editValidation, bookEditPutController);
router.delete('/delete/:bookid', bookDeleteController);

module.exports = router;