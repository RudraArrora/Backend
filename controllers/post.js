const Post= require('../models/post');
const Comment= require('../models/comment');
module.exports.create = async function(req,res){
    try {
            await Post.create({
              content: req.body.content,
              user: req.user._id,
            })
            return res.redirect('/');
    } catch (error) {
        console.log("Error in posting ,", error)
    }

}
module.exports.destroy =async function(req,res){
let post = await  Post.findById(req.params.id)
if (post.user == req.user.id){
  await  Post.findByIdAndDelete(req.params.id);
  await  Comment.deleteMany({post:req.params.id});
    res.redirect('/');
}
} 