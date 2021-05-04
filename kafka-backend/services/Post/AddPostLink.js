const UserModel = require("../../models/UserModel");
const PostModel = require("../../models/PostModel");
const CommunityModel = require("../../models/CommunityModel");

const msg1= {UserID: "609022e68ca680977b4d0fa5"};
const handle_request = async (req, callback) => {
    const res={};
    const msg= req.body;
    UserModel.findById(msg1.UserID)
        .then((user)=>{
            CommunityModel.findOne({community_name:msg.community})
                .exec()
                .then((community)=>{
                    PostModel.create({
                        community_id: community.community_id,
                        text: msg.URL,
                        title: msg.title,
                        author_id: msg1.UserID
                    },(err,post)=>{
                        if(post){
                            community.posts.push(post._id);
                            community.save();
                            // user.posts.push(post._id);
                            // user.save();
                            res.status = 200;
                            res.data = 'POST_ADDED';
                            callback(null, res);
                        }
                        else{
                           // console.log(err);
                            res.status = 201;
                            res.data = err;
                            callback(null, res);
                        }
                    })
                }).catch((e) => {
                   // console.log(e);
                    res.status = 500;
                    res.data = e;
                    callback(null, res);
                  });
        })
        .catch((e) => {
           // console.log(e);
            res.status = 500;
            res.data = e;
            callback(null, res);
          });
}

exports.handle_request = handle_request;