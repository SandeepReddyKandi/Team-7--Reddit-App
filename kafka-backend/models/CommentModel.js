const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    upvote: {
      type: Array,
    },
    downvote: {
      type: Array,
    },
    sub_comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubComment" }],
    comment: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentSchema);
