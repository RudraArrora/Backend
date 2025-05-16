const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Authentication using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        let user = await User.findOne({ email: email });
        console.log("Found user:", user);

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log("Error in finding user in Passport Local Strategy:", err);
        return done(err);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("Error in deserializing user:", err);
    return done(err);
  }
});

// Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/signIn");
};

// Set authenticated user in locals
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    console.log("Authenticated user:", req.user); // Optional debug
  }
  return next();
};

module.exports = passport;
