const UserModel = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

const handle_request = async (req, callback) => {

    //check whether account exists/not
    const users = await UserModel.find({}, {"name":1, "email":1})
    if (users && users.length > 0){
        callback(null, {
            msg: 'User list retrieved successfully',
            data: users,
            success: true
        })
    }
    else {
        callback(null, {
            msg: 'User list retrieved unsuccessfully',
            success: false,
        })
    } 
};

exports.handle_request = handle_request;