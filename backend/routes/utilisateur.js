const router = require('express').Router();
const userCtrl = require('../controllers/utilisateur');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-post')
router.post('/signup', userCtrl.inscription)
router.post('/login', userCtrl.login)
router.get('/user/:id', auth, userCtrl.getOneUser)
router.get('/user',auth, userCtrl.getAllUser)
router.put('/update/:id',auth,  multer, userCtrl.update)
router.delete('/delete/:id', auth, userCtrl.deleteProfil)
module.exports = router;
