const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

const User = model('User', userSchema);

module.exports.User = User;