const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const StrategyJwt = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY;


const cookieExtractor = function (req) {
  let token = null;
  console.log(
    "Extracting: ",
    req.cookies["api-auth"]
  );
  if (req && req.cookies) token = req.cookies["api-auth"];
  // if (req && req.signedCookies && req.signedCookies.jwt) {
  //   token = req.signedCookies["jwt"]["token"];
  // }
  console.log(token);
  return token;
  
};



function configurePassport(passport) {
  console.log("passport");
  // Local Strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });

        if (!user) {
          return done(null, false, { message: 'No User Exists' });
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
          return done(null, false, { message: 'Invalid Password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  //jwt strategy
passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secretKey,
      maxAge: "7d",
      passReqToCallback: true,
    },
    async function (req, jwtPayload, done) {

      return User.findOne({ username: jwtPayload.username })
        .then(async (user) => {
    
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

  // Bearer Strategy
  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const decodedToken = jwt.verify(token, secretKey);
        console.log(token);
        // Check token expiration
        if (decodedToken.exp < Date.now() / 1000) {
          return done(null, false, { message: 'Token has expired' });
        }
  
        const user = await User.findById(decodedToken.userId);
  
        if (!user) {
          return done(null, false, { message: 'Invalid Token' });
        }
  
        return done(null, user);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return done(null, false, { message: 'Token has expired' });
        }

        if (error instanceof SyntaxError || error.name === 'JsonWebTokenError') {
          return done(null, false, { message: 'Invalid JSON in token' });
        }
  
        // Handle other errors
        return done(error);
      }
    })
  );
}

module.exports = configurePassport;
