const express = require('express');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
require('dotenv').config();

const UserModel = require('./models/User');

const PASSWORD = process.env.DATABASE_PASSWORD;
const DBNAME = process.env.DATABASE_NAME;

app.use(express.json())

mongoose.connect(`mongodb+srv://BWSIEVERT:${PASSWORD}@scrimaster.4hpsi.mongodb.net/${DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
});

app.get('/', async (req, res) => {
    const user = new UserModel({
        userName: 'George',
        email: 'Georgeman@gmail.com',
        password: 'Georgye12345'
    });
    try {
        await user.save();
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})