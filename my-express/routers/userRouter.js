const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const authorization = require('../middlewares/authorization');
const router = express.Router();

const alluser = async (req, res) => {
    const result = await User.find();
    res.send(result);
}

// Check user by email => error msg => save user
const newUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('Email Address Exists!');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        const result = await user.save();
        const token = user.generateJWT();
        res.send({
            token: token,
            data: {
                name: result.name,
                email: result.email
            }
        });
    } catch (err) {
        const errMsgs = [];
        for (field in err.errors) {
            errMsgs.push(err.errors[field].message);
        }
        return res.status(400).send(errMsgs);
    }
}

router.route('/')
    .post(newUser)
    .get(alluser)

router.route('/me')
    .get(authorization, (req, res) => {
        res.send(req.user)
    })

module.exports = router;