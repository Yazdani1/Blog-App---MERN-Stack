const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var wishListSchema = mongoose.Schema({


  wishlist: [
    {
      
      postdetails: { type: ObjectId, ref: "Post" },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  postedBy: {
    type: ObjectId,
    ref: "User",
  },

});

module.exports = mongoose.model("WishList", wishListSchema);
