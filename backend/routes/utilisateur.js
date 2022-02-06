const router = require('express').Router();
const userCtrl = require('../controllers/utilisateur')

router.post('/signup', userCtrl.inscription)
router.post('/login', userCtrl.login)
router.get('/user/:id', userCtrl.getOneUser)
router.put('/update/:id', userCtrl.update)


module.exports = router;
