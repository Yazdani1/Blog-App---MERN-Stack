const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//post route for registraion

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }
    const hash_password = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hash_password,
    });

    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
});

//login

router.post("/login", (req, res) => {
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
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
