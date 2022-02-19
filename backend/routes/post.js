const router = require('express').Router()
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const userCtrl = require('../controllers/utilisateur')
const multerPost = require('../middleware/multer-post');

router.get('/home', auth, multerPost, postCtrl.getAllPost)
router.post('/home/:id',auth,  multerPost, postCtrl.createpost)
router.delete('/post/:id',auth,  multerPost, postCtrl.deleteOnePost)
router.post('/home/:postId/like',auth,  multerPost, postCtrl.likeOnePost )
router.get('/home/like', postCtrl.getAllLike )


module.exports = router;