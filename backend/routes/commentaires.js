const router = require('express').Router()
const userCtrl = require('../controllers/commentaire');
const auth = require('../middleware/auth');

router.get('/home/:postId/commentaires', auth, userCtrl.getAllComment)
router.post('/home/:postId/commentaires',  userCtrl.postcomment)
router.delete('/commentaires/:commentID', userCtrl.deleteOneComment)


module.exports = router;