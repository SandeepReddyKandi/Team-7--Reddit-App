const CommentModel = require("../../models/CommentModel");
const SubCommentModel = require("../../models/SubCommentModel");
const UserModel = require("../../models/UserModel");

const handle_request = async (req, callback) => {
  try {
    const user = await UserModel.find({ _id: req.body.author_id });
    req.body.author_id = user[0];
    var subCommentModel = new SubCommentModel(req.body);
    const savedSubComment = await subCommentModel.save();
    await CommentModel.findOneAndUpdate(
      { _id: savedSubComment.comment_id },
      { $push: { sub_comments: savedSubComment._id } }
    );
    callback(null, {
      msg: "SubComment Added successfully!",
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
