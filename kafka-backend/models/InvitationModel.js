const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    inviter: {
      type: String,
      required: true,
    },
    recepient: {
      type: String,
      required: true,
    },
    community_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "P",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invitations", invitationSchema);
