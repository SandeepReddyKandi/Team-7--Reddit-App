const CommunityModel = require("../../models/CommunityModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.body.id) {
      criteria._id = mongoose.Types.ObjectId(req.body.id);
    }
    const communityList = await CommunityModel.find(criteria);
    const community = communityList[0];
    if (req.body.upvote_user_id) {
      community.upvote.push(req.body.upvote_user_id);
    } else if (req.body.downvote_user_id) {
      community.downvote.push(req.body.downvote_user_id);
    }
    var commToSave = new CommunityModel(community);
    commToSave.save().then(() => {
      callback(null, {
        msg: "Community Up/Down vote successful",
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
