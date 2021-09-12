const mongoose = require("mongoose");

var likeSchema = mongoose.Schema({
    count:{
        type: String
    },
    title:{
        type: String,
        
    },
    title:{
        type: String,
        
    }

});

module.exports = mongoose.model("Like", likeSchema);
