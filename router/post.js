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
        res.json({ ourPostData });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

//get all post api

router.get("/getpost", (req, res) => {
  Post.find({})
    .sort({ date: "DESC" })
    .populate("postedBy", "name email")
    .then((resultGet) => {
      res.json(resultGet);
    })
    .catch((err) => {
      console.log(err);
    });
});

//latest post

router.get("/latestpost", (req, res) => {
  Post.find({})
    .sort({ date: "DESC" })
    .limit(5)
    .populate("postedBy", "name email")
    .then((latestPost) => {
      res.json(latestPost);
    })
    .catch((err) => {
      console.log(err);
    });
});

//my post api

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name email")
    .then((mypostdata) => {
      res.json(mypostdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete route

router.delete("/delete/:id", (req, res) => {
  var deleteData = { _id: req.params.id };

  Post.findByIdAndDelete(deleteData)
    .then((deleteData) => {
      res.json(deleteData);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
