const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
const Post = require("../models/Post");

//post data api

router.post("/post", requireLogin, (req, res) => {
  const { title, des } = req.body;

  try {
    if (!title || !des) {
      return res.status(400).json({ error: "Please add all fields.." });
    }

    const postData = Post({
      title,
      des,
      postedBy: req.user,
    });

    Post.create(postData)
      .then((ourPostData) => {
        res.json({ post: ourPostData, message: "Please add all the fields" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

//get all post api

router.get("/getpost", requireLogin, (req, res) => {
  Post.find({})
    .sort({ date: "DESC" })
    .populate("postedBy", "name email")
    .then((resultGet) => {
      res.json({ resultGet });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
