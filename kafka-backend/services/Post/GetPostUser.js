const PostModel = require("../../models/PostModel");
const UserModel = require("../../models/UserModel");

const msg= {UserID: "607b6d47b38a6c5d10274a51"};
const handle_request = async (req, callback) => {
    const res={};
    console.log("inside services add post link");
    console.log(msg);
    UserModel.findById(msg.UserID)
        .populate('posts')
        .exec((err,user)=>{
            if(user){
                res.data={

                }
                res.status = 200;
                callback(null, res);
            } else if (err) {
                res.status = 201;
                res.data = err;
                callback(null, res);
              }
        })
    
}

exports.handle_request = handle_request;