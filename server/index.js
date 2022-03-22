require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connection = require('./db');
const PORT = 8080;
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

// database connection
connection();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})