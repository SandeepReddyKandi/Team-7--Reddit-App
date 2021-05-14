const InvitationModel = require("../../models/InvitationModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    req.body.sender = mongoose.Types.ObjectId(req.body.sender);
    req.body.recepient = mongoose.Types.ObjectId(req.body.recepient);
    var invitation = new InvitationModel(req.body);
    invitation.save().then(() => {
      callback(null, {
        msg: "Invitation sent successfully!",
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
