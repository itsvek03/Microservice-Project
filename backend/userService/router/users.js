const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const userController = require('../controller/userController')
const checkAuth = require('../middleware/checkAuth')


router.post('/signup', authController.signUp);

router.post('/login', authController.login);

router.get('/', checkAuth, userController.getUserInfo)



module.exports = router;