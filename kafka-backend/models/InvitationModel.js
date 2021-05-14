const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true, 
    },
    recepient: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
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
