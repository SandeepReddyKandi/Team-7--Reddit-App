const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    console.log(req.memberId);
    const criteria = {};
    if (req.memberId) {
      criteria.members = req.memberId;
    }
    console.log(criteria);
    Community.find(criteria, (err, response) => {
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
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
