const CommunityModel = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    CommunityModel.find(
      { community_name: req.body.community_name },
      (err, docs) => {
        if (docs.length) {
          callback(null, {
            msg: "Community with same name already exists.",
            success: false,
          });
        } else {
          var communityModel = new CommunityModel(req.body);
          communityModel.save().then(() => {
            callback(null, {
              msg: "Community Added successfully!",
              success: true,
            });
          });
        }
      }
    );
  } catch (error) {
    //res.status(400).json({ msg: error.message });
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
