const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
