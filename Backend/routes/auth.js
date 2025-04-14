const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, package } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hash, package });

    await user.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, package: user.package } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
router.post('/purchase', auth, async (req, res) => {
    const { packageType } = req.body;
  
    const packagePoints = {
      Silver: 50,
      Gold: 150,
      Diamond: 300,
    };
  
    try {
      const user = await User.findById(req.user.id);
      const points = packagePoints[packageType];
      if (!points) return res.status(400).json({ msg: 'Invalid package type' });
  
      user.points += points;
      user.package = packageType;
      await user.save();
  
      res.json({ msg: 'Points purchased', points: user.points, package: user.package });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });

module.exports = router;
