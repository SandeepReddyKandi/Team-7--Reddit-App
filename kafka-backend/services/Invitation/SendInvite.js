const InvitationModel = require("../../models/InvitationModel");

const handle_request = async (req, callback) => {
  try {
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
