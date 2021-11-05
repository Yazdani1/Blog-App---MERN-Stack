const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
const Post = require("../models/Post");

//post data api
router.post("/post", requireLogin, (req, res) => {
  const { title, des, pic } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: "Please add Post Title.." });
    }

    if (!des) {
      return res.status(400).json({ error: "Please add Post Description.." });
    }

    if (!pic) {
      return res.status(400).json({ picerror: "Please add Post Picture.." });
    }

    const postData = Post({
      title,
      des,
      postedBy: req.user,
      photo: pic,
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
    .populate("postedBy", "_id name email")
    .then((resultGet) => {
      res.json({ resultGet: resultGet });
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
    .sort({ date: "DESC" })
    .populate("postedBy", "_id name email")
    .then((mypostdata) => {
      res.json({ mypostdata: mypostdata });
    })
    .catch((err) => {
      console.log(err);
    });
});

// //user profile

// router.get("/userprofile",requireLogin, (req, res) => {
//   Post.find({ postedBy: req.user._id })
//     .populate("postedBy", "_id name email")
//     .then((mypostdata) => {
//       res.json(mypostdata);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//total post

//delete route

//get edit data
router.get("/edit/:id", requireLogin, (req, res) => {
  var editQuery = { _id: req.params.id };
  Post.findOne(editQuery)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});
//update data tot the database
router.put("/update/:id", requireLogin, (req, res) => {
  var updateQuery = { _id: req.params.id };
  Post.updateOne(updateQuery, {
    $set: {
      title: req.body.title,
      des: req.body.des,
      date: Date.now(),
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/delete/:id", requireLogin, (req, res) => {
  var deleteData = { _id: req.params.id };
  Post.findByIdAndDelete(deleteData)
    .then((deleteData) => {
      res.json(deleteData);
    })
    .catch((err) => {
      console.log(err);
    });
});
//details post
router.get("/details/:id", (req, res) => {
  var detailsQuery = { _id: req.params.id };
  Post.findOne(detailsQuery)
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((detailspost) => {
      res.json({ detailspost: detailspost });
    })
    .catch((err) => {
      console.log(err);
    });
});

//like features api design

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

//comments route

router.put("/comments", requireLogin, (req, res) => {
  const { text } = req.body;
  const comment = {
    text,
    postedBy: req.user._id,
  };

  if (!text) {
    return res.status(400).json({ error: "This field can't be empty" });
  }

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )

    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")

    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

module.exports = router;
