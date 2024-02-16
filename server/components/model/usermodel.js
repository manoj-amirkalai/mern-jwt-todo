const mongoose = require("mongoose");
const mongodb = require("mongoose");
const Schema = mongodb.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "This email is already registered."],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongodb.model("Userdetails", Schema);
module.exports = User;
