const Router = require('express');
const router = new Router();
const authorController = require('./AuthorController');


router.get('/author', authorController.getAuthors);
router.get('/author/:id', authorController.getAuthor);
router.get('/author/:id/image', authorController.getAuthorImages);

router.get('/image', authorController.getImages);
router.get('/image/count', authorController.getCountImages);
router.get('/image/random_id', authorController.getRandomIdImage);
router.get('/image/random', authorController.getRandomImages);
router.get('/image/:id', authorController.getImage);

router.post('/registration', authorController.registrationAuthor);
router.post('/login', authorController.loginAuthor);

router.post('/author/:id/image', authorController.verifyLogin, authorController.addImage);

router.put('/author/:id/image', authorController.verifyLogin, authorController.changeImage);
router.put('/author/edit_profile', authorController.verifyLogin, authorController.changeProfile);

router.delete('/author/:id/image', authorController.verifyLogin, authorController.deleteImage);

module.exports = router;