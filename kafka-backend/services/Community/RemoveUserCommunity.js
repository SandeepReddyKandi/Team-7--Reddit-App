const Community = require("../../models/CommunityModel");
const Post = require("../../models/PostModel");
const Comment = require("../../models/CommentModel");
const SubComment = require("../../models/SubCommentModel");

const handle_request = async (req, callback) => {
  try {
      const community_id = req.body.community_id;
      const user_id = req.body.user_id;
      const community = await Community.find({_id: community_id}).populate('posts');
      const posts = community[0].posts;
      community[0].members.splice(community[0].members.indexOf(user_id), 1);
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
      const subComments = await SubComment.find({comment_id: { $in: commentList }})
      const deleteSubcommentList = []
      for (let i in subComments){
        if (user_id === subComments[i].author_id) {
          deleteCommentList.push(subComments[i]._id)
        }
      }
      SubComment.deleteMany({_id: {$in: deleteSubcommentList}})
      Comment.deleteMany({_id: { $in: deleteCommentList } })
      Post.deleteMany({_id: deletePostList})
      community[0].save().then(() => {
        return callback(null, {
          msg: "Community created successfully",
          success: true,
        });
      });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;