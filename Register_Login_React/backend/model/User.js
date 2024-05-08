// Import necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
