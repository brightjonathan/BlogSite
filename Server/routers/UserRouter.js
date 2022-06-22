const express = require('express');
const router = express.Router();
const {registeruser, loginuser, google} = require('../Controllers/UserController')


router.post('/signup', registeruser);
router.post('/signin', loginuser);
router.post('/googleSignIn', google);

module.exports= router