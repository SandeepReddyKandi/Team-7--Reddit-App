const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    photo: { type: String, default: "" },
    topics: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
