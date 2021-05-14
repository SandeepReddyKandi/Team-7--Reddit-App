const PostModel = require("../../models/PostModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    let posts = await PostModel.find({
      community_id: req.community_id,
    })
      .populate("comments")
      .skip(parseInt(req.page * req.rows))
      .limit(parseInt(req.rows));
    let totalRows = await PostModel.countDocuments({
      community_id: req.community_id,
    });

    let json = {
      totalRows,
      data: posts,
    };
    return callback(null, {
      msg: "",
      data: json,
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
