const Post = require("../../models/PostModel");

const handle_request = async (req, callback) => {
    try {
        // const criteria = {};
        if (req) {
            const criteria = {
                $or: [
                    { "text": req.searchPostsCriteria },
                    { "title": req.searchPostsCriteria }
                ]
            }
            // criteria.searchPostsCriteria = { $regex: req.searchPostsCriteria, $options: "i" };
            console.log("***********", criteria);
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


            //         , (err, doc) => {
            // if (err) {
            //     console.log("Error")
            //     return callback(null, {
            //         msg: error.message,
            //         success: false,
            //     });
            // }
            // else {
            //     console.log("no error")
            //     return callback(null, {
            //         msg: "Posts found",
            //         success: true,
            //         data: doc,
            //     });
            // }
            // });
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