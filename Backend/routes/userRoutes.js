const express = require('express')
const userRoutes = express.Router()
const userController = require('../controller/user/userController')
const auth = require("../middleware/auth")

userRoutes.post('/api/signup', userController.signup);
userRoutes.post('/api/otpVerification',userController.otpVerification);
userRoutes.post('/api/loginValidation',userController.loginValidation);

module.exports = userRoutes