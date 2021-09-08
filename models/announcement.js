const mongoose = require("mongoose");

var announcementSchema = mongoose.Schema({
  des: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Announcement", announcementSchema);
