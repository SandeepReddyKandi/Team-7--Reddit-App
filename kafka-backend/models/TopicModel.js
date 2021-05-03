const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("topics", topicSchema);
