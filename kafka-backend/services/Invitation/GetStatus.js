const InvitationModel = require("../../models/InvitationModel");
const CommunityModel = require("../../models/CommunityModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    const community = await CommunityModel.find({
      _id: mongoose.Types.ObjectId(req.body.community_id),
    });
    if (community.members > 0 && community.members.includes(req.body.userId)) {
      const data = {
        status: "active",
      };
      return callback(null, {
        msg: "",
        data: data,
        success: true,
      });
    } else if (community.admin_id === req.body.userId) {
      const data = {
        status: "active",
      };
      return callback(null, {
        msg: "",
        data: data,
        success: true,
      });
    } else {
      await InvitationModel.find({
        community_id: mongoose.Types.ObjectId(req.body.community_id),
        sender: req.body.userId,
      }).then((response) => {
        return callback(null, {
          msg: "",
          data: response,
          success: true,
        });
      });
    }
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
