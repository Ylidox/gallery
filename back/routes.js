const Router = require('express');
const router = new Router();
const authorController = require('./AuthorController');


router.get('/author', authorController.getAuthors);
router.get('/author/:id', authorController.getAuthor);
router.get('/author/:id/image', authorController.getAuthorImages);

router.get('/image', authorController.getImages);
router.get('/image/count', authorController.getCountImages);
router.get('/image/random_id', authorController.getRandomIdImage);
router.get('/image/:id', /*authorController.verifyLogin,*/ authorController.getImage);

router.post('/registration', authorController.registrationAuthor);
router.post('/login', authorController.loginAuthor);

router.put('/author/:id/image', authorController.verifyLogin, authorController.addImage);

module.exports = router;