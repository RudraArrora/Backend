const Post= require('../models/post');
const { use } = require("../routes/user");

module.exports.home = async function (req,res){
  let posts= await Post.find({})
  .populate('user')
  .populate({
    path : 'comments',
    populate :{
      path : 'user'
    }
  })
  return  res.render('home',{
    posts:posts
  });
}