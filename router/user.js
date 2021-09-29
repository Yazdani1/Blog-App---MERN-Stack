const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { requireLogin } = require("../middleware/auth");

require("dotenv").config();

//post route for registraion

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ errort: "Please Add Your Full Name" });
    }
    if (!email ) {
      return res.status(400).json({ errort: "Please Add Your valid E-mail Address" });
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
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

//protected route

router.get("/", requireLogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.get("/", requireLogin, async (req, res) => {
//   console.log(req.user);
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
