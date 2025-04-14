const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  category: String, 
  availability: Boolean,
  pricePerHour: Number,
  pricePerDay: Number,
  image: String
});

module.exports = mongoose.model('Car', carSchema);
