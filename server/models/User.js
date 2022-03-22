const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: "https://icon-library.com/icon/user-profile-icon-11.html"
    }
},
    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
    }, 
    process.env.JWTPRIVATEKEY,
    {
        expiresIn: '7d'
    });
    return token;
}

const User = mongoose.model('user', userSchema);

const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        email: joi.string().required().email().label("Email"),
        password: passwordComplexity().required().label("Password"),
        avatar: joi.string().required().label("Avatar")
    });
    return schema.validate(data)
}

module.exports = {
    User,
    validate
}