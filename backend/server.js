const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
require('dotenv').config();


const mongo_user = process.env.MONGO_USER
const mongo_password = process.env.MONGO_PASSWORD


//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
  "mongodb+srv://"+mongo_user+":"+mongo_password+"@cluster0.wkgm20f.mongodb.net/test?retryWrites=true&w=majority",
 )
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", async (req, res) => {   
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



app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
