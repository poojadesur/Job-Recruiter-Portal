const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// Recruiter Model
const Recruiter = require('../../../models/Recruiters');


// @route   POST api/auth/recruiter/register
// @desc    Register new Recruiter
// @access  Public -- Authentication !!!
router.post('/register', (req,res) => {
   
    // when registering want these fields - can update contact number and bio later
    const {name, email, password, repassword, contact_number, bio } = req.body;

   //Simple Validation
   if(!name || !email || !password) {
       return res.status(400).json({ msg: 'Please enter all fields! '});
   }

   // Check if password is entered correctly twice
   if(password !== repassword )
   {
        return res.status(400).json({ msg: 'Passwords do not match! Try again'});
   }

   //Check for existing user
   Recruiter.findOne({ email })
    .then(app => {
        if(app) return res.status(400).json({ msg: 'User already exists' });

        const newRec = new Recruiter({
            name,
            email,
            password,
            contact_number,
            bio
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt)  => {
            bcrypt.hash(newRec.password,salt,(err,hash) => {
                if(err) throw err;
                newRec.password = hash;
                newRec.save()
                    .then(user => {

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                        ph: user.contact_number
                                    }
                                });
                            }
                        )
                    });
            });
        })
    })
});

// @route   POST api/auth/recruiter/login
// @desc    Auth user (Login)
// @access  Public -- Authentication !!!
router.post('/login', (req,res) => {

   const {email, password } = req.body;

   //Simple Validation
   if(!email || !password) {
       return res.status(400).json({ msg: 'Please enter all fields! '});
   }

   //Check for existing recruiter
   Recruiter.findOne({ email })
    .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist.' });

        // Validate password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials.'});

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    }
                )
            })
       
    })
});



module.exports = router;
