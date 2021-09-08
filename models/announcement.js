const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var announcementSchema = mongoose.Schema({
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

module.exports = mongoose.model("Announcement", announcementSchema);
