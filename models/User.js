const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    about: {
      type: String,
    },
    experience: {
      type: String,
    },
    favourite: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],

    photo: {
      type: String,
      required: true,
    },

    message: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
