const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    console.log("*******request is: ", req.memberId)
    const criteria = {};
    if (req.memberId) {
      criteria.members = req.memberId;
    }
    console.log("*******criteria is: ", criteria)
    Community.find(criteria, (err, response) => {
      if (err) {
        return callback(null, {
          msg: err.message,
          success: false,
        });
      } else {
        console.log("Insde ", response)
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
