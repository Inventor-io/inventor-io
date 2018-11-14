const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Strategy } = require('passport-facebook');
require('dotenv').config();

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/login/facebook/return',
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
    (accessToken, refreshToken, profile, cb) =>
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      cb(null, profile),
  ),
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

router.get('/', (req, res) => {
  res.json('/api/login route');
});

router.get('/login/facebook1', (req, res) => {
  console.log('hey its working');
  res.send('hi nik');
});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

module.exports = router;
