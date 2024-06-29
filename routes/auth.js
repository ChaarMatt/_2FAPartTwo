const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({
        username: username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    });
    newUser.save(err => {
        if (err) {
            res.status(500).send('Error registering new user.');
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;
