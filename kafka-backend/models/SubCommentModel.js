const mongoose = require("mongoose");

const subCommentSchema = new mongoose.Schema({
  comment_id: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SubComment", subCommentSchema);
