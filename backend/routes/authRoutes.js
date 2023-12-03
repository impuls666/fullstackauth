const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();
// login route
router.post('/login', (req, res, next) => {
const secretKey = process.env.SECRET_KEY;
const secure_cookie = process.env.SECURE_COOKIE;
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, secretKey);
  
      //return res.json({ token: `Bearer ${token}`, message: 'Successfully Authenticated' });
      res.cookie("api-auth",token,{
        secure:secure_cookie,
        httpOnly:true,
        sameSite:'None',
      
        expires: new Date(Date.now() + 900000) 
      });
      res.json({ message: 'Successfully Authenticated' });
    })(req, res, next);
  });
  
  router.post('/register', async (req, res) => {
    try {
      const existingUser = await User.findOne({ username: req.body.username });
  
      if (existingUser) {
        return res.send('User Already Exists');
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.send('User Created');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;