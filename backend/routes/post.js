const router = require('express').Router()
const userCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multerPost = require('../middleware/multer-post');

router.get('/home', multerPost, userCtrl.getAllPost)
router.post('/home/:id',  multerPost, userCtrl.createpost)
router.delete('/post/:id', multerPost, userCtrl.deleteOnePost)
router.post('/home/:postId/like', auth, multerPost, userCtrl.likeOnePost )
router.get('/home/like', userCtrl.getAllLike )


module.exports = router;