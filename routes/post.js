const express = require("express");
const router = express.Router();
const postController = require('../controllers/post');
const passport = require("passport");
router.post('/create',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports = router;