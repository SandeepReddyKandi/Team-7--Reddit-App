const CommentModel = require("../../models/CommentModel");

const handle_request = async (req, callback) => {
  try {
    var commentModel = new CommentModel(req.body);
    commentModel.save().then((response, error) => {
      if (error) {
        return callback(null, {
          msg: "Failed to add comment",
          success: true,
        });
      }
      return callback(null, {
        msg: "Comment Added successfully!",
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
