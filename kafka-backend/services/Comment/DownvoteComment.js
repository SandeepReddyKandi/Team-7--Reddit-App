const CommentModel = require("../../models/CommentModel");

const CommentsModel = require("../../models/CommentModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    await CommentsModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.id) },
      { $push: { downvote: req.user } }
    ).then(() => {
      return callback(null, {
        msg: "Upvote Updated successfully!",
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
