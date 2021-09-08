const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models//Post");
const { requireLogin } = require("../middleware/auth");

router.get("/userprofileda/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((userInfo) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name email")
        .exec((err, postsData) => {
          if (err) {
            return res.status(400).json({ error: err });
          }
         
          res.json(postsData);
        })
        .catch((err) => {
          return res.status(404).json({ error: err });
        });
    });
});

module.exports = router;
