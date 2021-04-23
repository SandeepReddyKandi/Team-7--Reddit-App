const CommunityModel = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    let communities = await CommunityModel.find();
    callback(null, {
      msg: "",
      success: true,
      data: communities,
    });
  } catch (error) {
    //res.status(400).json({ msg: error.message });
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
