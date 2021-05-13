const UserModel = require("../../models/UserModel");
const mongoose = require("mongoose");

const handle_request = async (req, callback) => {
  try {
    UserModel.find(
      { _id: mongoose.Types.ObjectId(req.id) },
      (err, response) => {
        if (err) {
          return callback(null, {
            msg: "Something went wrong!",
            success: false,
          });
        } else {
          return callback(null, {
            msg: "",
            success: true,
            data: response,
          });
        }
      }
    );
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};
exports.handle_request = handle_request;
