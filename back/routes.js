const Router = require('express');
const router = new Router();
const authorController = require('./AuthorController');

router.get('/author', authorController.getAuthors);
router.get('/author/:id', authorController.getAuthor);
router.get('/author/:id/image', authorController.getAuthorImages);
router.get('/image', authorController.getImages);
// router.get('/image', authorController.getImages);
router.get('/image/:id', authorController.getImage);


module.exports = router;