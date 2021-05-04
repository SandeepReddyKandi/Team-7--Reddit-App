const PostModel = require("../../models/PostModel");

const handle_request = async (req, callback) => {
  try {
    let posts = await PostModel.find(req.community_id)
      .skip(req.page)
      .limit(req.rows);

    return callback(null, {
      msg: "",
      data: posts,
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
