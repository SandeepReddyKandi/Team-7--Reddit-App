const Community = require("../../models/CommunityModel");
const Post = require("../../models/PostModel");
const Comment = require("../../models/CommentModel");
const SubComment = require("../../models/SubCommentModel");
const Invitation = require("../../models/InvitationModel");

const handle_request = async (req, callback) => {
  try {
      const community_id = req.body.community_id;
      const user_id = req.body.user_id;
      const posts = await Post.find({community_id: community_id});
      const postList = [];
      const deletePostList = []; 
      for (let i in posts){
          if( user_id === posts[i].author_id) {
            deletePostList.push(posts[i]._id)
          }
          postList.push(posts[i]._id)
      }
      const comments = await Comment.find({post_id: { $in: postList } });
      const deleteCommentList = [];
      const commentList = [];
      for (let i in comments) {
          if (user_id === comments[i].author_id || deletePostList.includes(comments[i].post_id)){
              deleteCommentList.push(comments[i]._id)
          }
          commentList.push(comments[i]._id)
      }
      const subComments = await SubComment.find({subComments})
      SubComment.deleteMany({comment_id: {$in: commentList}})
      Comment.deleteMany({post_id: { $in: postList } })
      Post.deleteMany({community_id: community_id})
      Invitation.deleteMany({community_id: community_id})
      Community.delete({_id: community_id}, (err, docs) => {
          if (!err){
            callback(null, {
                msg: "Community deleted successfully",
                success: false,
            });
          }
      })
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;