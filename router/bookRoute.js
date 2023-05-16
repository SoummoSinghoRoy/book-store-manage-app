const router = require('express').Router()

const { bookAllGetController, bookAddPostController, bookEditPutController, bookDeleteController } = require('../controller/bookController');
const book_createValidation = require('../validator/book/book_createValidation');

router.get('/', bookAllGetController);
router.post('/add-new', book_createValidation, bookAddPostController);
router.put('/edit/:bookid', bookEditPutController);
router.delete('/delete/:bookid', bookDeleteController);

module.exports = router;