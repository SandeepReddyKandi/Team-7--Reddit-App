const UserModel = require("../../models/UserModel");

const handle_request = async (req, callback) => {
    console.log('Inside handle Request GET USER BY USER ID');
    console.log(req);
    if (!req.userName) {
        return callback(null, {
            msg: 'User Name is required!',
            success: false,
        });
    }
    try {
        UserModel.findOne({ userName: req.userName}, (err, response) => {
            if (err) {
                console.log('Error', err.message)
                return callback(null, {
                    msg: err.message,
                    success: false,
                });
            } else {
                console.log('Response', response)
                return callback(null, {
                    msg: "",
                    success: true,
                    data: response,
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
