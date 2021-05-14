const Community = require("../../models/CommunityModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    Community.updateOne(
      { _id: req.community_id, members: { $in: [req.user_id] } },
      { $pop: { members: -1 } },
      (err, docs) => {
        if (!err) {
          return callback(null, {
            msg: "Community member removed successfully",
            success: true,
          });
        }
      }
    );
  } catch (error) {
    //res.status(400).json({ msg: error.message });
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};
exports.handle_request = handle_request;
