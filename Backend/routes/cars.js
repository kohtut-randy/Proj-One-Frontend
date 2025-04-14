const express = require('express');
const Car = require('../models/Car');
const { auth, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({ availability: true });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/', auth, admin, async (req, res) => {
    const { name, category, pricePerHour, pricePerDay, image } = req.body;
    try {
      const car = new Car({ name, category, pricePerHour, pricePerDay, image, availability: true });
      await car.save();
      res.status(201).json(car);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  
  router.put('/:id', auth, admin, async (req, res) => {
    try {
      const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!car) return res.status(404).json({ msg: 'Car not found' });
      res.json(car);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
  
  router.delete('/:id', auth, admin, async (req, res) => {
    try {
      const car = await Car.findByIdAndDelete(req.params.id);
      if (!car) return res.status(404).json({ msg: 'Car not found' });
      res.json({ msg: 'Car deleted' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });

module.exports = router;
