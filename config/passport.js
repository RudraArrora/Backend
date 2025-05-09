const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField:'email'
},
async function(email,password,done){
    try {
          let user = await User.findOne({ email: email });
        if (!user || user.password!=passport){
            console.log("Invalid Usename Password");
            return(null,false);
        }
return done(null,user);
    } catch (error) {
        console.log("Error in finding the passport local strategy::",error);
        return done(err);
    }
}))
module.exports=passport;