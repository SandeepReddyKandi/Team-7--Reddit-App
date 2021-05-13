const CommentModel = require("../../models/CommentModel");
const PostModel = require("../../models/PostModel");

const handle_request = async (req, callback) => {
  try {
    var commentModel = new CommentModel(req.body);
    const savedComment = await commentModel.save();
    await PostModel.findOneAndUpdate(
      { _id: savedComment.post_id },
      { $push: { comments: savedComment._id } }
    );
    callback(null, {
      msg: "Comment Added successfully!",
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
