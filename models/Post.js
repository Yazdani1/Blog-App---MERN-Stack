const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var postSchema = mongoose.Schema({
  title: {
    type: String,
  },

  
  des: {
    type: String,
  },


  date: {
    type: Date,
    default: Date.now,
  },


  postedBy:{
    type:ObjectId,
    ref:"User"
  }
});

module.exports = mongoose.model("Post", postSchema);
