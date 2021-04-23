const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rules", ruleSchema);
