const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    community_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    upvote: {
      type: Array,
    },
    downvote: {
      type: Array,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
    post_body: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);
