const InvitationModel = require("../../models/InvitationModel");

const handle_request = async (req, callback) => {
  try {
    console.log(req.communityId);
    const criteria = {};
    if (req.communityId) {
      criteria.community_id = req.communityId;
      criteria.status = "pending";
    }
    console.log(criteria);
    InvitationModel.find(criteria, (err, response) => {
      if (err) {
        return callback(null, {
          msg: err.message,
          success: false,
        });
      } else {
        return callback(null, {
          msg: "",
          success: true,
          data: response,
        });
      }
    }).populate('users');
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
