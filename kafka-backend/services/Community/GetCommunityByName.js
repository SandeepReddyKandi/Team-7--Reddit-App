const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.communityName) {
      criteria.community_name = { $regex: req.communityName, $options: "i" };
    }
    const response = await Community.find(criteria).populate("members");
    callback(null, {
      msg: "",
      success: true,
      data: response,
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
