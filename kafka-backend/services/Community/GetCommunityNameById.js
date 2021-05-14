const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    const response = await Community.findById(req.id, { community_name: 1 });
    callback(null, {
      msg: "",
      success: true,
      data: response.community_name,
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
