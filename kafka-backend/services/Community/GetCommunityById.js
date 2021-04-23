const CommunityModel = require("../../models/CommunityModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    await CommunityModel.find(
      { _id: mongoose.Types.ObjectId(req.community_id) },
      (err, response) => {
        if (err) {
          callback(null, {
            msg: "Something went wrong!",
            success: false,
          });
        } else {
          callback(null, {
            msg: "",
            success: true,
            data: response,
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
