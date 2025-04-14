const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  points: { type: Number, default: 0 },
  isAdmin:{type:Boolean, default:false},
  package: { type: String, enum: ['Silver', 'Gold', 'Diamond'], default: 'Silver' }
});

module.exports = mongoose.model('User', userSchema);
