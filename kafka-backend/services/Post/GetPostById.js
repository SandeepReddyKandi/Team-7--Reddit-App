const PostModel = require("../../models/PostModel");

const handle_request = async (req, callback) => {
  try {
    let posts = await PostModel.find({ _id: req.post_id }).populate(
      "author_id"
    );
    callback(null, {
      msg: "",
      data: posts,
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
