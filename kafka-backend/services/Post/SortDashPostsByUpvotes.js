const Post = require("../../models/PostModel");
const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
    try {
        if (req) {
            const userJoinedCommunities = await Community.find({
                members: req.userId
            })
            let communitiesIds = [];
            userJoinedCommunities.forEach(community => {
                communitiesIds.push(community.community_id);
            });
            console.log("Communities are: ", communitiesIds);

            const posts = Post.aggregate([
                {
                    $match: {
                        community_id: {
                            $in: communitiesIds
                        }
                    }
                },
                {
                    $addFields: {
                        numberOfUsers: { $size: "$community_id.members" },
                    },
                },
                {
                    $sort : { numberOfUsers : 1}
                }
            ]);

            console.log("***Posts are***", posts);










            // let results = [];
            // userJoinedCommunities.forEach(async element => {
            //     const posts = await Post.aggregate([
            //         { $match: { community_id: element.community_id } },
            //         { $sort: { length: -1 } }
            //     ]);
            //     if (posts.length > 0) {
            //         results.push(posts)
            //     }
            // });

            // return callback(null, {
            //     msg: "",
            //     data: posts,
            //     success: true,
            // });
            // const userJoinedCommunities = await Community.find({
            //     members: req.userId
            // })
            // .populate("posts");

            // const posts = userJoinedCommunities[0]._doc.posts;
            // console.log("posts: ", posts);
            // return callback(null, {
            //     msg: "Posts found",
            //     success: true,
            //     data: posts,
            // });
            // const data = await Post.find(criteria)
            // if (data) {
            //     console.log("no error");
            //     console.log("data", data);
            //     return callback(null, {
            //         msg: "Posts found",
            //         success: true,
            //         data: data,
            //     });
            // }
            // else {
            //     console.log("Error")
            //     return callback(null, {
            //         msg: "Could not fetch posts",
            //         success: false,
            //     });
            // }
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