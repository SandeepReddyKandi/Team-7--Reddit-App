const Post = require("../../models/PostModel");

const handle_request = async (req, callback) => {
    try {
        // const criteria = {};
        if (req) {
            const criteria = {
                $or: [
                    { text:  { '$regex': req.searchPostsCriteria , '$options': 'i'} },
                    { title:  { '$regex': req.searchPostsCriteria , '$options': 'i'} }
                ]
            }
            const data = await Post.find(criteria)
            if (data) {
                console.log("no error");
                console.log("data", data);
                return callback(null, {
                    msg: "Posts found",
                    success: true,
                    data: data,
                });
            }
            else {
                console.log("Error")
                return callback(null, {
                    msg: "Could not fetch posts",
                    success: false,
                });
            }
        }
    }
    catch (error) {
        return callback(null, {
            msg: error.message,
            success: false,
        });
    };
};

exports.handle_request = handle_request;