const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false, 
  },
  address: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
