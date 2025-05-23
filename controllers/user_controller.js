const Post = require("../models/post");
const User = require("../models/user");
const { use } = require("../routes/user");
module.exports.pro = async  function (req, res) {
  return res.render("profile");
};
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signUp");
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signIn");
};
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm) {
    return res.redirect("/");
  }
  let user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/signIn");
    } else {
      return res.redirect("/users/signIn");
    }
  } catch (error) {
    console.log("***********", error);
  }
};
module.exports.createSession = async function (req, res) {
  // let user = await User.findOne({email:req.body.email});
  // console.log(user);
  // if (user){
  //     if (user.password != req.body.password) {
  //       return res.redirect("/users/signIn");
  //     } else {

  //       return res.render("home",{
  //         mail : user.email,
  //         name : user.name
  //       });
  //     }
  // }
  return res.redirect("/");
};
module.exports.destroy = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
