const router = require('express').Router()

const { publisherAllGetController, publisherAddPostController, publisherEditPutController, publisherDeleteController } = require('../controller/publisherController');
const publisher_createValidation = require('../validator/publisher/publisher_createValidation');
const passport = require('../middleware/passport');
const isAuthenticated = passport.authenticate('jwt', { session: false });

router.get('/', isAuthenticated, publisherAllGetController);
router.post('/add-publisher', isAuthenticated, publisher_createValidation, publisherAddPostController);
router.put('/edit/:publisherid', isAuthenticated, publisher_createValidation, publisherEditPutController);
router.delete('/delete/:publisherid', isAuthenticated, publisherDeleteController);

module.exports = router;