const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  todo_list: [
    {
      list: {
        type: String,
      },
      date: {
        type: Date,
      },
      is_finished: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
