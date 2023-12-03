const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require("cookie-parser");
const mongooseConnection = require('./config/mongoose');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const configurePassport = require('./passportConfig');
const app = express();
const PORT = 4000;

const cors_domain = process.env.CORS;

mongooseConnection();



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: cors_domain,
    credentials: true,
  })
)
app.use(cookieParser());
configurePassport(passport); 
app.use(passport.initialize());

// auth Routes
app.use('/auth', authRoutes);


app.get(
  "/checkAuth",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    user.password = undefined;
    res.json({ message: "You're Logged in!", user });
  }
);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
