const Invitations = require("../../models/InvitationModel");
const Community = require("../../models/CommunityModel");

const handle_request = async (req, callback) => {
  try {
    const invite_id = req.body.invite_id;
    const invitee = req.body.invitee;
    const community_id = req.body.community_id;
    const invitation = await Invitations.findById(invite_id)
    if (!Invitations){
        return callback(null, {
            msg: "Invite missing",
            success: false,
          });
    }
    invitation.status = "approved"
    invitation.save()
    Community.findByIdAndUpdate(
        community_id,
        {$push: {members: invitee}}).then((result,err) => {
            if(err){
                return callback(null, {
                    status: 204,
                    message: "Database Issue",
                    success: false,
                })
            }
            else{
                return callback(null, {
                    status: 200,
                    message: "success",
                    success: true,
                })
            }
        })


  } catch (error) {
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};

exports.handle_request = handle_request;