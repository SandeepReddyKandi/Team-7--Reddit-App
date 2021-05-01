const CommentModel = require("../../models/CommentModel");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.comment_id) {
      criteria._id = req.comment_id;
    }
    let comments = await CommentModel.find(criteria);
    callback(null, {
      msg: "",
      success: true,
      data: comments,
    });
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
