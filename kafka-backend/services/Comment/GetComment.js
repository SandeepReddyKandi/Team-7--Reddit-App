const CommentModel = require("../../models/CommentModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.comment_id) {
      criteria.post_id = mongoose.Types.ObjectId(req.comment_id);
    }
    let comments = await CommentModel.find(criteria)
      .populate("author_id")
      .populate({ path: "sub_comments", populate: { path: "author_id" } });
    return callback(null, {
      msg: "",
      success: true,
      data: comments,
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
