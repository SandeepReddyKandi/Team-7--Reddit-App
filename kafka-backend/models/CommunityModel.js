const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    community_id: {
      type: String,
    },
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
    rules: {
      type: Array,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
    members: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true, 
    }],
    topic: {
      type: Array,
    },
    upvote: {
      type: Array,
    },
    downvote: {
      type: Array,
    },
    admin_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("communities", communitySchema);
