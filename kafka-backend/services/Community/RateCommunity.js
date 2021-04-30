const CommunityModel = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    //const comm = await CommunityModel.find({
    //  community_name: req.body.community_name,
    //});
    //console.log("Community:" + comm[0].community_name);
    const vote = {};
    if (req.body.upvote_user_id) {
      vote.upvote = req.body.upvote_user_id;
    } else if (req.body.downvote_user_id) {
      vote.downvote = req.body.downvote_user_id;
    }

    CommunityModel.updateOne(
      { community_name: req.body.community_name },
      { $push: vote },
      (err) => {
        if (err) {
          callback(null, {
            msg: err,
            success: false,
          });
        } else {
          callback(null, {
            msg: "Up/Down vote successful",
            success: true,
          });
        }
      }
    );
  } catch (error) {
    //res.status(400).json({ msg: error.message });
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
