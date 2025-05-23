const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const passport = require("passport");
router.post("/create", passport.checkAuthentication, commentController.create);
router.get("/destroy/:id", passport.checkAuthentication,commentController.destroy);
module.exports = router;
