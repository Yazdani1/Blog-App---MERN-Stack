const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { requireLogin } = require("../middleware/auth");
const crypto = require("crypto");
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
    const hash_password = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hash_password,
    });
    await user.save().then((registerData) => {
      transporter.sendMail({
        to: registerData.email,
        from: "yaz4noor@gmail.com",
        subject: "Signup Success",
        html: `<h1>Welcome to this blog site. You have become a member
        
        <h5>Your Details</h5>
        <ul>
        <li><p>Your Name: ${registerData.name}</p></li>
        <li><p>Your E-mail: ${registerData.email}</p></li>
        <li><p>You have joined: ${registerData.createdAt}</p></li>

        </ul>
        </h1>`,
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

    // const { _id, name, email } = user;

    // return res.json({ token, user });
    transporter.sendMail({
      to: user.email,
      from: "yaz4noor@gmail.com",
      subject: "Sign in Success",
      html: `<h1> You have successfully loged in to your account. Your name is: ${user.name}
      You Joined on ${user.createdAt}
      <ul>
      <li>Your About is: ${user.about}</li>
      </ul>
      </h1>`,
    });
    return res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

//end login route

//forgot passwar

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");

    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ error: "Please add your valid E-mail!" });
    }

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "No user with this email address" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "yaz4noor@gmail.com",
          subject: "Reset Password",
          html: `
          <p>You have requested to reset your password</p>
          <h4>Click in this <a href="${process.env.resetpass_url}/reset/${token}" > link  </a> to reset your password</h4>
          `,
        });
        res.json({ message: "Check your email for password reset" });
      });
    });
  });
});

//new password

router.post("/new-password", (req, res) => {
  const newpassword = req.body.password;

  if (!newpassword) {
    return res.status(422).json({ error: "Add your new password" });
  }

  const sentToken = req.body.token;

  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Try again later. Your session has expired" });
      }

      bcrypt.hash(newpassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;

        user.save().then((savedpassword) => {
          transporter.sendMail({
            to: user.email,
            from: "yaz4noor@gmail.com",
            subject: "You have changed your Password",
            html: `
            <h5>You have successfully changed your password!</h5>
            `,
          });

          res.json({ message: "You have changed your password" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
      .populate("message.postedBy", "_id name email photo")
      .populate("favourite", "_id des title likes comments photo date postedBy")
      .populate(
        "mycomments",
        "_id des title likes comments photo date postedBy"
      );

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

//End remove comments

//my comments route

router.post("/mycomments", requireLogin, (req, res) => {
  const { postID } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    $addToSet: { mycomments: postID },
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/remove-mycomments", requireLogin, (req, res) => {
  const { postID } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    $pull: { mycomments: postID },
  }).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

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
