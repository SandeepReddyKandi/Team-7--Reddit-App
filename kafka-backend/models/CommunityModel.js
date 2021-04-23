const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    community_name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    rules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rules" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    upvote: {
      type: Array,
    },
    downvote: {
      type: Array,
    },
    admin_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("community", communitySchema);
