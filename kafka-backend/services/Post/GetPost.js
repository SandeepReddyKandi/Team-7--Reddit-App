const PostModel = require("../../models/PostModel");

const handle_request = async (req, callback) => {
  try {
    // console.log("*********GET POST SERVICE**********");
    // console.log("*********req**********", req);

    const criteria = {};
    // console.log("*********req.post_id**********", req.post_id);

    if (req.post_id) {
      criteria.author_id = req.post_id;
    }
    // console.log("*********criteria**********", criteria);
    let posts = await PostModel.find(criteria).populate("author_id");
    //.populate({ path: "comments", populate: { path: "author_id" } })
    //.populate({ path: "sub_comments", populate: { path: "author_id" } });
    // console.log("*********posts**********", posts);

    callback(null, {
      msg: "",
      data: posts,
      success: true,
    });
  } catch (error) {
    callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;
