const mongoose = require("mongoose");

var mongoSchema = mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.Schema("Category", mongoSchema);
