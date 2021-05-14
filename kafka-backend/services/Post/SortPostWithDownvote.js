const PostModel = require("../../models/PostModel");

const handle_request = async (req, callback) => {
  try {
    let posts = await PostModel.aggregate([
      { $match: { community_id: req.id } },
      {
        $project: {
          community_id: 1,
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
          length: { $size: "$downvote" },
        },
      },
      { $sort: { length: -1 } },
    ])
      .skip(parseInt(req.page * req.rows))
      .limit(parseInt(req.rows));

    let totalRows = await PostModel.countDocuments({ community_id: req.id });
    let json = {
      totalRows,
      data: posts,
    };
    return callback(null, {
      msg: "",
      data: json,
      success: true,
    });
  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
