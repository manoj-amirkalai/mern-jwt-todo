const mongoose = require("mongoose");
const mongodb = require("mongoose");
const Schema = mongodb.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    todo: { type: String, required: [true, "Please enter your todo"] },
  },
  {
    timestamps: true,
  }
);

const Todo = mongodb.model("todo", Schema);
module.exports = Todo;
