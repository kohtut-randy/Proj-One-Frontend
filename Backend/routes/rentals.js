const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const { createRental } = require('../controllers/rentalController');

const router = express.Router();

router.post('/', auth, createRental);

module.exports = router;
