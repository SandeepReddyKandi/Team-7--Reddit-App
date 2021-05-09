const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const { client } = require("../../db");

const handle_request = async (req, callback) => {
  try {
    const redKey = req;
    let bool = false;

    client.get(redKey, (err, user) => {
      if (err) throw err;

      if (user) {
        const member = JSON.parse(user);
        return callback(null, {
          msg: "Logged in successfully",
          data: member,
          success: true,
        });
      }
      UserModel.find({}, { name: 1, email: 1 }, (err, users) => {
        if (users && users.length > 0) {
          client.setex(redKey, 600, JSON.stringify(users));
          return callback(null, {
            msg: "User list retrieved successfully",
            data: users,
            success: true,
          });
        } else {
          return callback(null, {
            msg: "User list retrieved successfully",
            data: users,
            success: true,
          });
        }
      });
    });
    s;
  } catch (err) {}
};

exports.handle_request = handle_request;
