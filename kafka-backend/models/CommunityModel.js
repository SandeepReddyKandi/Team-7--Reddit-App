const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    community_id: {
      type: String,
    },
    community_name: {
      type: String,
      required: true,
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
    posts: {
      type: Array,
    },
    members: {
      type: Array,
    },
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

module.exports = mongoose.model("communities", communitySchema);
