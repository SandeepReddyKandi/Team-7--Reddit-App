const PostModel = require("../../models/PostModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    await PostModel.findOneAndUpdate(
      { _id: req.post_id },
      { $push: { upvote: req.user } }
    );

    return callback(null, {
      msg: "Post Updated successfully!",
      success: true,
    });
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
