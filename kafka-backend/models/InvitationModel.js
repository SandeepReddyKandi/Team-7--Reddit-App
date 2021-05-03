const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    sender: {
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
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invitations", invitationSchema);
