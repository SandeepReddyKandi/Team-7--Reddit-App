const PostModel = require("../../models/PostModel");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.post_id) {
      criteria._id = req.post_id;
    }
    let posts = await PostModel.find(criteria);
    callback(null, {
      msg: "",
      success: true,
      data: posts,
    });
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
