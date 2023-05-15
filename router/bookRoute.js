const router = require('express').Router()

const { bookAllGetController, bookAddPostController, bookEditPutController, bookDeleteController } = require('../controller/bookController');

router.get('/', bookAllGetController);
router.post('/add-new', bookAddPostController);
router.put('/edit/:bookid', bookEditPutController);
router.delete('/delete/:bookid', bookDeleteController);

module.exports = router;