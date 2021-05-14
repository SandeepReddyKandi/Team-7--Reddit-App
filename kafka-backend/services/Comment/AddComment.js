const CommentModel = require("../../models/CommentModel");
const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");

const handle_request = async (req, callback) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.author_id });
    req.body.author_id = user;
    let commentModel = new CommentModel(req.body);
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
