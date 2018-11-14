const express = require('express');
const router = express.Router();
const passport = require('passport');
require('./passport');

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
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('made it to authenticate');
    res.redirect('/');
  },
);

module.exports = router;
