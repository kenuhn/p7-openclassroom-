const router = require('express').Router();
const userCtrl = require('../controllers/utilisateur');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-post')
router.post('/signup', userCtrl.inscription)
router.post('/login', userCtrl.login)
router.get('/user/:id', userCtrl.getOneUser)
router.get('/user/',  userCtrl.getAllUser)
router.put('/update/:id', multer, userCtrl.update)
router.get('/jwtid', userCtrl.jwtokenid)
router.get('/logout', userCtrl.logout)
router.delete('/delete/:id', userCtrl.deleteProfil)
module.exports = router;
