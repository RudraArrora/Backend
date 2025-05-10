const express = require('express');
const router  = express.Router();

const homeController =require('../controllers/home');
const passport = require('passport');

console.log('router loaded');

router.get('/',passport.checkAuthentication,homeController.home);
router.use('/users',require('./user'));
module.exports = router;