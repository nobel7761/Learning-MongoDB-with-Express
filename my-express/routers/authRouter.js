const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');
const router = express.Router();

const authUser = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send('Invalid email or password');

    const token = user.generateJWT();
    res.send({
        Status: "Successfully Authenticated!",
        token: token
    });
}

router.route('/')
    .post(authUser)

module.exports = router;