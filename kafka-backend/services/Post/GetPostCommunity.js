const CommunityModel = require("../../models/CommunityModel");

const msg= {UserID: "609022e68ca680977b4d0fa5",communityID:"608b8305cf9ebd2d9694e801"};
const handle_request = async (req, callback) => {
    console.log("Inside get post community");
    const res={};
    CommunityModel.findById(msg.communityID)
        .populate('posts')
        .exec((err,community)=>{
            if(community){
                res.data={
                    community_name: community.community_name,
                    posts: community.posts,
                }
                res.status = 200;
                callback(null, {
                    msg: "GET_POST_PASSED",
                    success: true,
                    data: res.data,
                  });
            } else if (err) {
                res.status = 201;
                res.data = err;
                callback(null, {
                    msg: "GET_POST_FAILED",
                    success: true,
                    data: res.data,
                  });
              }
        })
    
}

exports.handle_request = handle_request;