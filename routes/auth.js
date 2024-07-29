const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const path = require('path'); // Add this line

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    let errors = [];

    if (!username || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        User.findOne({ username: username }).then(user => {
            if (user) {
                res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            } else {
                const newUser = new User({
                    username,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.status(201).json({ msg: 'User registered successfully' });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
        failureFlash: true
    })(req, res, next);
});

// 2FA Success page
router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/success.html'));
});

// 2FA Failure page
router.get('/failure', (req, res) => {
    res.status(401).send('Login failed');
});

module.exports = router;
