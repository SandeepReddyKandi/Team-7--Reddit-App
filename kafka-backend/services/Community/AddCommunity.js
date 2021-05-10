const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    Community.find({ community_name: req.body.community_name }, (err, docs) => {
      if (docs.length) {
        return callback(null, {
          msg: "Community with same name already exists.",
          success: false,
        });
      } else {
        var community = new Community(req.body);
        community.save().then(() => {
          return callback(null, {
            msg: "Community created successfully",
            success: true,
          });
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
