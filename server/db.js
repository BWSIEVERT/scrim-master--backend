const mongoose = require('mongoose');

const PASSWORD = process.env.DATABASE_PASSWORD;
const DBNAME = process.env.DATABASE_NAME;

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        mongoose.connect(`mongodb+srv://BWSIEVERT:${PASSWORD}@scrimaster.4hpsi.mongodb.net/${DBNAME}?retryWrites=true&w=majority`, connectionParams);
        console.log("Connected to database successfully.")
    } catch (error) {
        console.log(error);
        console.log('Could not connect to database.')
    }
};