const router = require('express').Router()

const { publisherAllGetController, publisherAddPostController, publisherEditPutController, publisherDeleteController } = require('../controller/publisherController');
const publisher_createValidation = require('../validator/publisher/publisher_createValidation');

router.get('/', publisherAllGetController);
router.post('/add-publisher', publisher_createValidation, publisherAddPostController);
router.put('/edit/:publisherid', publisher_createValidation, publisherEditPutController);
router.delete('/delete/:publisherid', publisherDeleteController);

module.exports = router;