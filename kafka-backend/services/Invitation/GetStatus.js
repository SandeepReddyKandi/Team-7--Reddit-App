const InvitationModel = require("../../models/InvitationModel");
const CommunityModel = require("../../models/CommunityModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    const community = await CommunityModel.find({
      _id: mongoose.Types.ObjectId(req.body.community_id),
    });
    if (
      community[0].members > 0 &&
      community[0].members.includes(req.body.userId)
    ) {
      const data = {
        status: "active",
      };
      return callback(null, {
        msg: "",
        data: data,
        success: true,
      });
    } else if (
      JSON.parse(JSON.stringify(community[0])).admin_id === req.body.userId
    ) {
      const data = {
        status: "approved",
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
        if (response.length > 0) {
          const data = {
            status: "pending",
          };
          return callback(null, {
            msg: "",
            data,
            success: true,
          });
        } else {
          const data = {
            status: "",
          };
          return callback(null, {
            msg: "",
            data,
            success: true,
          });
        }
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
