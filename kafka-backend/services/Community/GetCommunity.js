const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req) {
      criteria._id = req;
    }
    await Community.find(criteria, (err, response) => {
      if (err) {
        return callback(null, {
          msg: error.message,
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
    //res.status(400).json({ msg: error.message });
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
