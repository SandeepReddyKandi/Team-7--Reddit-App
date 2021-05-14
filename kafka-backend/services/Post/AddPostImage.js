const UserModel = require("../../models/UserModel");
const PostModel = require("../../models/PostModel");
const CommunityModel = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
    console.log("inside add post image")
    console.log("------check------",req.body);
    const msg= req.body;
    const res={};
    UserModel.findById(msg.UserID)
        .then((user)=>{
            CommunityModel.findOne({community_name: msg.community})
                .exec()
                .then((community)=>{
                    PostModel.create({
                        community_id: community.community_id,
                        images: msg.imageList,
                        title: msg.title,
                        author_id: user._id
                    },(err,post)=>{
                        if(post){
                            community.posts.push(post._id);
                            community.save();
                            // user.posts.push(post._id);
                            // user.save();
                            res.status = 200;
                            res.data = 'POST_ADDED';
                            callback(null, {
                                msg: "POST_ADDED",
                                success: true,
                                data: res
                              });
                        }
                        else{
                         //   console.log(err);
                            res.status = 201;
                            res.data = err;
                            callback(null, {
                                msg: "POST_ADD_FAILED",
                                success: true,
                                data: res.data,
                                status: res.status
                              });
                        }
                    })
                }).catch((e) => {
                  //  console.log(e);
                    res.status = 500;
                    res.data = e;
                    callback(null, {
                        msg: "COMMUNITY_NOT_FOUND",
                        success: false,
                        data: res.data,
                        status: res.status
                      });
                  });
        })
        .catch((e) => {
         //   console.log(e);
            res.status = 500;
            res.data = e;
            callback(null, {
                msg: "USER_NOT_FOUND",
                success: false,
                data: res.data,
                status: res.status
              });
          });
    
}

exports.handle_request = handle_request;