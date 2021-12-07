const express = require('express');
const { User } = require('../models/users');
const router = express.Router();

const newUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        res.status(400).send('Email Already Exists!');
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const result = user.save();
        res.send({
            name: result.name,
            email: result.email
        })
    }
    catch (error) {
        const errorMessage = [];
        for (field in error.errors) {
            errorMessage.push(error.errors[field].message);
        }
        return res.status(400).send(errorMessage);
    }
}

router.route('/')
    .post(newUser)

module.exports = router;