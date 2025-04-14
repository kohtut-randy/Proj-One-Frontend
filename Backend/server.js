const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRoutes=require('./routes/auth');
const carRoutes = require('./routes/cars');
const rentalRoutes = require('./routes/rentals'); 
const connectDB=require('./config/db');

dotenv.config();
const app=express();

connectDB();
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/car',carRoutes);
app.use('/api/rental',rentalRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});