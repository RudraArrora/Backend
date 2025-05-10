const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField:'email'
},
async function(email,password,done){
    try {
          let user = await User.findOne({ email: email });
          console.log(user);
        if (!user || user.password!=password){
            console.log("Invalid Usename Password");
            return(null,false);
        }
return done(null,user);
    } catch (error) {
        console.log("Error in finding the passport local strategy::",error);
        return done(err);
    }
}))

// serializer 
passport.serializeUser(function(user,done){
    done(null,user.id);
})
// deserilizer
passport.deserializeUser(function(id,done){
   let user = User.findById(id)
    try {
        return done(null,user);
    } catch (error) {
            console.log("Error in finding the passport local strategy::", error);
         return done(err);
    }
 })
module.exports=passport;