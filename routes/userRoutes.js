const express = require ('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {auth, admin} = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getUserInfo', auth, userController.getUserInfo)
router.get('/getAllUsers', auth, admin, userController.getAllUsers )



module.exports = router