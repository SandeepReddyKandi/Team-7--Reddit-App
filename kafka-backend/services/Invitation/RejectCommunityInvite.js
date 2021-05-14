const InvitationModel = require("../../models/InvitationModel");
const mongoose = require("mongoose");
const handle_request = async (req, callback) => {
    console.log("inside reject community invite");
  console.log("check---", req.userId);
//   try {
//     const criteria = {
//       $or: [{ sender: mongoose.Types.ObjectId(req.userId) }, { recepient: mongoose.Types.ObjectId(req.userId) }],
//     };
//     let invitations = await InvitationModel.aggregate([
//       { $match: criteria },
//       {
//         $project: {
//           sender: 1,
//           recepient: 1,
//           community_id: 1,
//           status: 1,
//           createdAt: 1,
//           updatedAt: 1,
//         },
//       },
//       { $sort: { createdAt: -1 } },
//     ])
//       .skip(parseInt(req.page * req.rows))
//       .limit(parseInt(req.rows));

//     const totalRows = await InvitationModel.countDocuments(criteria);

//     let json = {
//       invitations,
//       totalRows,
//     };

//     callback(null, {
//       msg: "Invitations fetched successfully",
//       data: json,
//       success: true,
//     });
//   } catch (error) {
//     callback(null, {
//       msg: error.message,
//       success: false,
//     });
//   }
};

exports.handle_request = handle_request;
