const mongoose = require('mongoose');

// create a user model
const User = mongoose.model('User', {
  oauthID: Number,
  name: String,
  created: Date,
});

module.exports = User;
