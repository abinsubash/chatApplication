const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  todoId:{
    type:mongoose.Schema.Types.ObjectId,
  },
  domain:{
    type:String
  }
});

const User = mongoose.model('User',userSchema);
module.exports = User