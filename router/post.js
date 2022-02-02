const router = require("express").Router();
const { requireLogin } = require("../middleware/auth");
const Post = require("../models/Post");

const User = require("../models/User");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

require("dotenv").config();

//to send email
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

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
      return res.status(400).json({ error: "Please add Post Picture.." });
    }

    const postData = Post({
      title,
      des,
      postedBy: req.user,
      photo: pic,
    });

    // let user = User.findOne({ email: req.user.email });

    Post.create(postData)
      .then((ourPostData) => {
        transporter.sendMail({
          to: "yaz4good@gmail.com",
          from: "yaz4noor@gmail.com",
          subject: "Your Post has been published",
          html: `<h1 className="card">Congratulations! Your post is live now.
          <ul>
          <li>Post Title:${ourPostData.title} </li>
          <li>Post Description:${ourPostData.des} </li>

          </ul>
          </h1>`,
        });
        res.json({ ourPostData });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

//get all post and pagination
// router.get("/getpost/:page", (req, res) => {
//   const currentPage = req.params.page || 1;
//   const perPage = 3;

//   Post.find({})
//     .skip((currentPage - 1) * perPage)
//     .sort({ date: "DESC" })
//     .populate("postedBy", "_id name email")
//     .limit(perPage)
//     .then((resultGet) => {
//       res.json({ resultGet: resultGet });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.get("/getpost", (req, res) => {
  Post.find({})
    .sort({ date: "DESC" })
    .populate("postedBy", "_id name email photo")

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
    .limit(6)
    .populate("postedBy", "name email photo")
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
      res.json(mypostdata);
    })
    .catch((err) => {
      console.log(err);
    });
});

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
    .populate("postedBy", "_id name photo")
    .populate("comments.postedBy", "_id name photo")
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
    .populate("likes.postedBy", "_id name")
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
    .populate("likes.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

//To get all the posts where user did comments..

// router.get("/mycomments", requireLogin, (req, res) => {
//   Post.find({ comments: { postedBy: req.user._id } })
//     .sort({ date: "DESC" })
//     .populate("postedBy", "_id name photo")
//     .populate("comments.postedBy", "_id name photo")
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       return res.status(422).json({ error: err });
//     });
// });

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
    .populate("comments.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")

    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/remove-comments", requireLogin, (req, res) => {
  const { text } = req.body;
  const comment = {
    text,
    postedBy: req.user._id,
  };

  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { comments: { _id: text._id } },
    },
    {
      new: true,
    }
  ).then((data) => {
    res.json(data);
  });
});

//pagination route

router.get("/total-posts", (req, res) => {
  Post.find()
    .estimatedDocumentCount()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});

//details post more post route

router.get("/more-posts", (req, res) => {
  Post.find({})
    .sort({ date: 1 })
    .limit(8)
    .populate("postedBy", "name email photo")
    .then((moreposts) => {
      res.json({ moreposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//details posts latest posts 3 posts

router.get("/detailspage-latestposts", (req, res) => {
  Post.find({})
    .sort({ date: "DESC" })
    .limit(4)
    .populate("postedBy", "name email photo")
    .then((latestposts) => {
      res.json({ latestposts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//to count posts based on the liked

// router.get("/featured-posts", (req, res) => {
//   Post.find({})
//     .sort({comments:-1})
//     .then((result) => {
//       res.json({ result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//wishlist

// router.put("/wishlist", requireLogin, (req, res) => {

//   const wishlistData = {
//     postdetails: req.body.postId,
//     postedBy: req.user._id,
//   };

//   Wishlist.create(

//     {
//       $push: { wishlist: wishlistData },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("wishlist.postedBy", "_id name")
//     .populate("postedBy", "_id name")

//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

// router.post("/wishlist", requireLogin, (req, res) => {

//   const postData = Wishlist({
//     wishlist: req.body.postId,
//     postedBy: req.user._id,
//   });
//   try {
//     Wishlist.create(postData)
//     .populate("wishlist", "_id title des")
//     .populate("postedBy", "_id name")
//       .then((ourPostData) => {
//         res.json({ ourPostData });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// });

//delete comment

// router.put("/deletecomments", requireLogin, (req, res) => {
//   const { text } = req.body;
//   const comment = {
//     text
//   };

//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $pull: { comments: {_id: comment._id} },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("comments.postedBy", "_id name")
//     .populate("postedBy", "_id name")

//     .exec((err, result) => {
//       if (err) {
//         return res.status(422).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

//delete comments

// router.delete("/deletecomments", requireLogin, (req, res) => {
//   Post.comments.findByIdAndDelete(req.body.commentid)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
