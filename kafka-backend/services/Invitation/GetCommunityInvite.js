const InvitationModel = require("../../models/InvitationModel");
const CommunityModel = require("../../models/CommunityModel");
const UserModel = require("../../models/UserModel");

const mongoose = require("mongoose");
const handle_request = async (req, callback) => {
  console.log('-----check--',req.userId);
  try {
    const criteria = {
      $and: [{ status: 'pending' }, { recepient: mongoose.Types.ObjectId(req.userId) }],
    };
    let invitations = await InvitationModel.aggregate([
      { $match: criteria },
      {
        $project: {
          community_id: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    //   .skip(parseInt(req.page * req.rows))
    //   .limit(parseInt(req.rows));

    // const totalRows = await InvitationModel.countDocuments(criteria);
    console.log("check invitations----",invitations);
    let json = {
      invitations,
    };

    callback(null, {
      msg: "Invitations fetched successfully",
      data: json,
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