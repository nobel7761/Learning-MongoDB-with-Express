const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minlength: 8,
        maxlength: 255
    },
    password: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 1024
    }
});

const User = model('User', userSchema);

module.exports.User = User;