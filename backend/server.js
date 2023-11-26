const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


require('dotenv').config();

const User = require('./models/user');
const Tajnedata = require('./models/Tajnedata');
const movie = require('./models/movie');

const configurePassport = require('./passportConfig');

const app = express();
const PORT = 4000;

const mongo_user = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASSWORD;
const secretKey = process.env.SECRET_KEY;

mongoose
  .connect(`mongodb+srv://${mongo_user}:${mongo_password}@cluster0.wkgm20f.mongodb.net/test?retryWrites=true&w=majority`)
  .then(() => console.log('Mongoose is connected'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)



configurePassport(passport); // Pass the passport instance to passportConfig
app.use(passport.initialize());



// login route
app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, {
      expiresIn: '1h',
    });

    return res.json({ token: `Bearer ${token}`, message: 'Successfully Authenticated' });
  })(req, res, next);
});

app.post('/register', async (req, res) => {
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

// Test protected route
app.get(
  '/protected',
  passport.authenticate('bearer', { session: false }), 
  
  async (req, res) => {
    const data = await Tajnedata.find()      
    const data2 = await movie.find({},'title').limit(10)
    res.json({ message: 'This is a protected route.', user: req.user, data:data, data2:data2 });    

    
  }
);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
