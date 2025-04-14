const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  rentalType: { type: String, enum: ['Hourly', '1-day', '2-day'] },
  rentalDate: Date
});

module.exports = mongoose.model('Rental', rentalSchema);