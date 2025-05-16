const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async  function(req,res){
let post =await Post.findById(req.body.post)
try {
    if (post) {
      let comment =await  Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      res.redirect("/");
    }
} catch (error) {
    console.log("Error In Creating The Comments : ",error);
}

}