const PostModel = require("../../models/PostModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    let posts = await PostModel.find({
      community_id: mongoose.Types.ObjectId(req.community_id),
    })
      .skip(parseInt(req.page))
      .limit(parseInt(req.rows));

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
