const UserModel = require("../../models/UserModel");

const handle_request = async (req, callback) => {
    if (!req.userId) {
        return callback(null, {
            msg: 'UserId is required!',
            success: false,
        });
    }
    try {
        UserModel.find({ userId: req.userId}, (err, response) => {
            console.log('Inside last step for the get User by Id')
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
