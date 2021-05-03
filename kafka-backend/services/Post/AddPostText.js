const UserModel = require("../../models/UserModel");
const PostModel = require("../../models/PostModel");
const CommunityModel = require("../../models/CommunityModel");

const msg= {UserID: "607b6d47b38a6c5d10274a51", CommunityID: "608b8305cf9ebd2d9694e801",title: "testtext", text :"testtextpost"};
const handle_request = async (req, callback) => {
    const res={};
    console.log("inside services add post link");
    console.log(msg);
    UserModel.findById(msg.UserID)
        .then((user)=>{
            console.log('----user details found------',user);
            CommunityModel.findById(msg.CommunityID)
                .then((community)=>{
                    console.log('---------inside community-------',community);
                    PostModel.create({
                        community_id: msg.CommunityID,
                        text: msg.text,
                        title: msg.title,
                        author_id: msg.UserID
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
                            console.log(err);
                            res.status = 201;
                            res.data = err;
                            callback(null, res);
                        }
                    })
                }).catch((e) => {
                    console.log(e);
                    res.status = 500;
                    res.data = e;
                    callback(null, res);
                  });
        })
        .catch((e) => {
            console.log(e);
            res.status = 500;
            res.data = e;
            callback(null, res);
          });
}

exports.handle_request = handle_request;