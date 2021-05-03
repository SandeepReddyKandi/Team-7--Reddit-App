const InvitationModel = require("../../models/InvitationModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    await InvitationModel.find({
      community_id: req.body.community_id,
      sender: req.body.userId,
    }).then((response) => {
     // console.log(response);
      callback(null, {
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
