const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const secret = "CMPE_273_Splitwise_secret";
const { client } = require("../../db");
const handle_request = async (req, callback) => {
    if (!req.userName) {
        return callback(null, {
            msg: 'User Name is required to update the profile!',
            success: false,
        });
    }
    try {
        // Fetch the user from this Id
        const user = await UserModel.findOne({ userName: req.userName});

        // Check if the user is trying to update someone else profile
        // Casting these vars, Since types are matching for these variables
        if (`${user._id}` !== `${req.jwtAuthData._id}`) {
            console.log()
            return callback(null, {
                msg: 'You are not allowed to edit other users profile!',
                success: false,
            });
        } else {
            const updatedFields = {}
            if (req.name) updatedFields.name = req.name;
            if (req.location) updatedFields.location = req.location;
            if (req.description) updatedFields.description = req.description;
            if (req.gender) updatedFields.gender = req.gender;
            if (req.topics) updatedFields.topics = req.topics;
            if (req.password) updatedFields.password =  bcrypt.hashSync(req.password, salt);
            const updatedUser = await user.update(updatedFields);
            return callback(null, {
                msg: "",
                success: true,
                data: updatedUser,
            });
        }
    }
    catch (e) {
        return callback(null, {
            msg: e.message,
            success: false,
        });
    }
};

exports.handle_request = handle_request;
