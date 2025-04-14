const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('../models/Car');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const cars = [
      { name: 'Toyota Prius', category: 'Sedan', availability: true, pricePerHour: 15, pricePerDay: 60, image: 'prius.jpg' },
      { name: 'Honda CR-V', category: 'SUV', availability: true, pricePerHour: 20, pricePerDay: 80, image: 'crv.jpg' },
      { name: 'Tesla Model 3', category: 'Sedan', availability: true, pricePerHour: 25, pricePerDay: 100, image: 'tesla.jpg' },
    ];

    await Car.deleteMany();
    await Car.insertMany(cars);

    console.log('Cars seeded!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


  // run with for testing node scripts/seedCars.js