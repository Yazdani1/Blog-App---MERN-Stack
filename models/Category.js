const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

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
