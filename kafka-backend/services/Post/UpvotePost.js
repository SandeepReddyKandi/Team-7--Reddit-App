const PostModel = require("../../models/PostModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    const post = await PostModel.findById(mongoose.Types.ObjectId(req.id));
    post.upvote.push(req.user);
    var postModel = new PostModel(post);
    postModel.save().then(() => {
      callback(null, {
        msg: "Post Updated successfully!",
        success: true,
      });
    });
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
