const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY;

function configurePassport(passport) {
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

  // Bearer Strategy
  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const decodedToken = jwt.verify(token, secretKey);
  
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
  
        // Handle other errors
        return done(error);
      }
    })
  );
  

  // Serialization and deserialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = configurePassport;
