const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { requireLogin } = require("../middleware/auth");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

require("dotenv").config();

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API,
    },
  })
);

//post route for registraion
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ errort: "Please Add Your Full Name" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ errort: "Please Add Your valid E-mail Address" });
    }
    if (!password) {
      return res.status(400).json({ errort: "Please Add Your Password" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errort: "User already exist" });
    }
    const hash_password = await bcrypt.hash(password, 12);

    user = new User({
      name,
      email,
      password: hash_password,
    });
    await user.save().then((registerData) => {
      transporter.sendMail({
        to: registerData.email,
        from: "shaon1132@gmail.com",
        subject: "Signup Success",
        html: "<h1>Welcome to this blog site. You have become a member</h1>",
      });
      res.json(registerData);
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Add all the field" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Account could not found " });
    }

    const isMatchData = await bcrypt.compare(password, user.password);
    if (!isMatchData) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    user.password = undefined;

    // const { _id, name, email } = user;

    // return res.json({ token, user });
  } catch (err) {
    console.log(err);
  }
});

//all usesers

router.get("/allusers", (req, res) => {
  User.find({})
    .select("-password")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//protected route

// router.get("/", requireLogin, (req, res) => {
//   User.findOne({ _id: req.user._id })
//     .then((userData) => {
//       res.json(userData);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.get("/", requireLogin, async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user._id)

      .select("-password")
      .populate("message.postedBy", "_id name email")
      .populate("favourite", "_id des title likes comments photo date");

    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

//user profile update

router.get("/update-user-profile/:id", requireLogin, (req, res) => {
  var editQuery = { _id: req.params.id };
  User.findOne(editQuery)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

router.put("/update-profile-info/:id", requireLogin, (req, res) => {
  var updateQuery = { _id: req.params.id };
  User.updateOne(updateQuery, {
    $set: {
      name: req.body.name,
      email: req.body.email,
      about: req.body.about,
      photo: req.body.pic,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//user experience

router.put("/add-experience", requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.body.userID, {
    $set: {
      experience: req.body.experience,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//wishlist

//Wishlist Route to save a post to user dashboard

// router.post("/save-favouritepost", requireLogin, (req, res) => {
//   const { postID } = req.body;

//   User.findByIdAndUpdate(req.body.userID, {
//     $addToSet: { favourite: postID },
//   })
//     .select("favourite")
//     .populate("favourite")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(400).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

router.post("/save-favouritepost", requireLogin, (req, res) => {
  const { postID } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    $addToSet: { favourite: postID },
  })
    .select("favourite")
    .populate("favourite")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

//to remove saved post

router.put("/remove-favouritepost", requireLogin, (req, res) => {
  const { postID } = req.body;

  User.findByIdAndUpdate(req.body.userID, {
    $pull: { favourite: postID },
  })
    .select("favourite")
    .populate("favourite")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

// router.get("/get-favouritepost", requireLogin, (req, res) => {
//   // var getUser = { _id: req.params.id };

//   User.findOne(req.user._id)
//     // .select("favourite")
//     .populate("favourite", "_id des")
//     .exec((err, result) => {
//       if (err) {
//         return res.status(400).json({ error: err });
//       } else {
//         res.json(result);
//       }
//     });
// });

// router.put("/update-favouritepost/:postID", (req, res) => {
//   User.findByIdAndUpdate(req.user._id, {
//     $pull: { favourite: req.params.postID },
//   }).exec((err, result) => {
//     if (err) {
//       return res.status(400).json({ error: err });
//     } else {
//       res.json(result);
//     }
//   });
// });

//end wish list route

//message route for sending message to the user.

router.put("/message", requireLogin, (req, res) => {
  const { text } = req.body;

  const message = {
    text,
    postedBy: req.user._id,
  };

  if (!text) {
    return res.status(400).json({ error: "This Field can't be empty!" });
  }

  User.findByIdAndUpdate(
    req.body.userID,
    {
      $push: { message: message },
    },
    {
      new: true,
    }
  )
    .populate("message.postedBy", "_id name email")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        return res.json(result);
      }
    });
});

// router.put("/comments", requireLogin, (req, res) => {
//   const { text } = req.body;
//   const comment = {
//     text,
//     postedBy: req.user._id,
//   };

//   if (!text) {
//     return res.status(400).json({ error: "This field can't be empty" });
//   }

//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $push: { comments: comment },
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

//end Wishlist Route to save a post to user dashboard

module.exports = router;
