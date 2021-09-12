const mongoose = require("mongoose");

var likeSchema = mongoose.Schema({
    count:{
        type: String
    }
});

module.exports = mongoose.model("Like", likeSchema);
