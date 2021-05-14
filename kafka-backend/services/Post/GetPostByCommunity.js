const PostModel = require("../../models/PostModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    let posts = await PostModel.find({
      community_id: mongoose.Types.ObjectId(req.post_id),
    }).populate("author_id");
    return callback(null, {
      msg: "",
      data: posts,
      success: true,
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
