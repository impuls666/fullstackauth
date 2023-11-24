const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("./models/user");
const jwt = require('jsonwebtoken');

router.post("/login", passport.authenticate("local"), (req, res) => {
    const token = jwt.sign({ userId: req.user._id, username: req.user.username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token: `Bearer ${token}`, message: 'Successfully Authenticated' });
});

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.send("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    res.send("User Created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/user", (req, res) => {
  res.json({ user: req.user }); // Use res.json to send JSON responses
});

module.exports = router;
