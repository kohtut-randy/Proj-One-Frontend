const Rental = require('../models/Rental');
const Car = require('../models/Car');
const User = require('../models/Users');

const createRental = async (req, res) => {
  const { carId, rentalType } = req.body;

  const rentalCosts = {
    'Hourly': 10,
    '1-day': 50,
    '2-day': 90
  };

  try {
    const user = await User.findById(req.user.id);
    const car = await Car.findById(carId);

    if (!car || !car.availability) {
      return res.status(404).json({ msg: 'Car not available' });
    }

    const cost = rentalCosts[rentalType];
    if (user.points < cost) {
      return res.status(400).json({ msg: 'Not enough points' });
    }

    user.points -= cost;
    await user.save();

    const rental = new Rental({
      user: user._id,
      car: car._id,
      rentalType,
      rentalDate: new Date()
    });

    car.availability = false;
    await Promise.all([car.save(), rental.save()]);

    res.status(201).json({ msg: 'Car rented successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createRental };
