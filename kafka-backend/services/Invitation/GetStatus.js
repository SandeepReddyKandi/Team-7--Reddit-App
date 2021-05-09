const InvitationModel = require("../../models/InvitationModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
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
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
