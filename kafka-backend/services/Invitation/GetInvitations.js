const InvitationModel = require("../../models/InvitationModel");

const handle_request = async (req, callback) => {
  try {
    const criteria = {
      $or: [{ sender: req.userId }, { recepient: req.userId }],
    };
    InvitationModel.find(criteria).then((response) => {
      callback(null, {
        msg: "Invitations fetched successfully",
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
