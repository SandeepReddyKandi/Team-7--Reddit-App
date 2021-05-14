const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "CMPE_273_Splitwise_secret";
const { client } = require("../../db");
const handle_request = async (req, callback) => {
  //check whether account exists/not
  const key = JSON.stringify(req);
  client.get(key, async (err, response) => {
    await UserModel.findOne({ email: req.body.email }, (err, doc) => {
      if (!doc) {
        return callback(null, {
          msg: "Account Not Found",
          success: false,
        });
      }
      client.setex(key, 600, JSON.stringify(doc));
      //check if password entered matches with the one in DB
      if (bcrypt.compareSync(req.body.password, doc.password)) {
        const token = jwt.sign({ userId: doc._id, email: doc.email }, secret, {
          expiresIn: "4h",
        });
        return callback(null, {
          token,
          msg: "Logged in successfully",
          userId: doc.id,
          userName: doc.userName,
          success: true,
        });
      } else {
        return callback(null, {
          msg: "Invalid Credentials Entered",
          success: false,
        });
      }
    });
  });
};

exports.handle_request = handle_request;
