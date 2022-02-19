const router = require('express').Router()
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const userCtrl = require('../controllers/utilisateur')
const multerPost = require('../middleware/multer-post');

router.get('/home', multerPost, postCtrl.getAllPost)
router.post('/home/:id', multerPost, postCtrl.createpost)
router.delete('/post/:id', multerPost, postCtrl.deleteOnePost)
router.post('/home/:postId/like', multerPost, postCtrl.likeOnePost )
router.get('/home/like', postCtrl.getAllLike )


module.exports = router;