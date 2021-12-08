const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: [5, "name must contain minimum 5 characters!"],
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "MINIMUM LENGTH 5"],
        maxlength: 1024,
        validate: {
            validator: (value) => value.length > 5,
            message: 'Password must be minimum 5 characters!'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, process.env.mySecretKey);
    return token;
}

const User = model('User', userSchema);

module.exports.User = User;