const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
});

const userData = mongoose.model("user", userSchema);
module.exports = userData;
