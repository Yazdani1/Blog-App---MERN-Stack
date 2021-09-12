const mongoose = require("mongoose");

var likeSchema = mongoose.Schema({});

module.exports = mongoose.model("Like", likeSchema);
