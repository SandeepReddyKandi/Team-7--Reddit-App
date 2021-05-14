const UserModel = require("../../models/UserModel");

const handle_request = async (req, callback) => {
    if (!req.userName) {
        return callback(null, {
            msg: 'User Name is required!',
            success: false,
        });
    }
    try {
        const user = await UserModel.findOne({ userName: req.userName}, {
            userName: 1,
            name: 1,
            location: 1,
            description: 1,
            gender: 1,
            photo: 1,
            topics: 1,
            createdAt: 1,
        });
        return callback(null, {
            msg: "",
            success: true,
            data: {
                ...user._doc,
                userId: user._id,
            },
        });
    } catch (error) {
        return callback(null, {
            msg: error.message,
            success: false,
        });
    }
};

exports.handle_request = handle_request;
