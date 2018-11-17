const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../database/Models/User.js');
require('dotenv').config();

// create a user model
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'https://localhost:3000/api/auth/login/facebook/return',
      passReqToCallback: true,
      profileFields: [
        'id',
        'displayName',
        'picture.width(200).height(200)',
        'first_name',
        'middle_name',
        'last_name',
        'email',
      ],
    },
    (req, accessToken, refreshToken, profile, done) => {
      User.findOne({ oauthID: profile.id }, (err, user) => {
        if (err) {
          console.log(err); // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          const userId = new User({
            oauthID: profile.id,
            name: profile.displayName,
            created: Date.now(),
          });
          userId.save(error => {
            if (err) {
              console.log(error); // handle errors!
            } else {
              console.log('saving user ...');
              done(null, user);
            }
          });
        }
      });
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log('in serialize :', user);
  console.log('I am the greatest EVER!');
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    console.log('in deserialize:', user);
    if (!err) {
      done(null, user);
    } else done(err, null);
  });
});

router.get('/', (req, res) => {
  res.json('/api/login route');
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    console.log('in the return function');
    res.redirect('https://localhost:3000/restaurant');
  },
);

module.exports = router;
