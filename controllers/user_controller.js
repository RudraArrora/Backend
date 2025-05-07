const User = require("../models/user");
module.exports.signUp = function(req,res){
    return res.render('signUp');
}
module.exports.signIn =function(req,res){
   return  res.render('signIn');
}
module.exports.create = async function(req,res){
if (req.body.password!=req.body.confirm){
    return res.redirect('/');
}
let user = await User.findOne({email:req.body.email})
try {
    if (!user){
       await  User.create(req.body);
       return res.redirect("/users/signIn");
    }
    else{
        return res.redirect("/users/signUp");
    }
} catch (error) {
    console.log ("***********",error);
}

}
// module.exports.createSession = function (req, res) {};