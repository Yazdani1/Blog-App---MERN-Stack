const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {requireLogin} = require('../middleware/auth');

require("dotenv").config();

//post route for registraion

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exist" });
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
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatchData = await bcrypt.compare(password, user.password);
    if (!isMatchData) {
      return res.status(400).json({ error: "Invalid email or password" });
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

router.get("/",requireLogin, async(req, res) => {
  console.log(req.user);
    try {
      const user = await User.findById(req.user._id).select('-password');
      res.json(user)
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
