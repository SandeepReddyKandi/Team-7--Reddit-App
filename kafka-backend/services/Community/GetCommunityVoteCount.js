const Community = require("../../models/CommunityModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.id) {
      criteria._id = mongoose.Types.ObjectId(req.id);
    }
    const communityList = await Community.find(criteria);
    const community = communityList[0];
    const voteCount = community.upvote.length - community.downvote.length;
    callback(null, {
      msg: "",
      success: true,
      data: voteCount,
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
