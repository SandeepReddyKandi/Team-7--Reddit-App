const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    community_id: {
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
    upvote: {
      type: Array,
    },
    downvote: {
      type: Array,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    post_body: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);
