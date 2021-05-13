const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    const criteria = {};
    if (req.communityName) {
      criteria.community_name = { $regex: req.communityName, $options: "i" };
    }
    let communities = await Community.aggregate([
      { $match: criteria },
      {
        $project: {
          community_id: 1,
          community_name: 1,
          description: 1,
          text: 1,
          images: 1,
          upvote: 1,
          downvote: 1,
          comments: 1,
          post_body: 1,
          title: 1,
          author_id: 1,
          url: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $sort: { community_name: 1 } },
    ])
      .skip(parseInt(req.page))
      .limit(parseInt(req.rows));
    callback(null, {
      msg: "",
      success: true,
      data: communities,
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
