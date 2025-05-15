const express= require('express');
const router = express.Router();
const passport= require('passport');
const userController =require('../controllers/user_controller');
router.get("/profile",passport.checkAuthentication, userController.pro);
router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/signIn" }),
  userController.createSession
);
router.get('/signOut',userController.destroy)
module.exports=router;