const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const User = require("./models/user");
require('dotenv').config();

const app = express();
const PORT = 4000;

const mongo_user = process.env.MONGO_USER;
const mongo_password = process.env.MONGO_PASSWORD;

mongoose.connect(
  `mongodb+srv://${mongo_user}:${mongo_password}@cluster0.wkgm20f.mongodb.net/test?retryWrites=true&w=majority`
)
  .then(() => console.log("Mongoose is connected"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
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
require("./passportConfig")(passport); // Pass the passport instance to passportConfig
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./authRoutes")); // Separate route handling

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
