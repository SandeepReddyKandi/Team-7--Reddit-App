const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.adminId) {
      criteria.admin_id = req.adminId;
    }
    console.log("......", criteria)
    const response = await Community.find(criteria).populate('members');
      if (typeof response !== 'object') {
        return callback(null, {
          msg: "Database issue",
          success: false,
        });
      } 
      else {
        return callback(null, {
          msg: "",
          success: true,
          data: response,
        });
      };
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
