const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  description: {
    type: String,
    required: true,
    max: 10000,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);