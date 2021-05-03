const PostModel = require("../../models/PostModel");

const handle_request = async (req, callback) => {
  try {
    var postModel = new PostModel(req.body);
    postModel.save().then(() => {
      callback(null, {
        msg: "Post Added successfully!",
        success: true,
      });
    });
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
