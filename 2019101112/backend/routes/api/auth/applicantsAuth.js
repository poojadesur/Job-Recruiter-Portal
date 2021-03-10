const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model
const Applicant = require('../../../models/Applicants');

// @route   POST api/auth/applicant/register
// @desc    Register new Applicant
// @access  Public -- Authentication !!!
router.post('/register', (req,res) => {
   
    // while registering only want these fields, can update education and skills later
    const {name, email, password, repassword, education, skills } = req.body;

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
   Applicant.findOne({ email }).then(app => {
        
        if(app) return res.status(400).json({ msg: 'User already exists' });

        const newApp = new Applicant({
            name,
            email,
            password,
            education,
            skills
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt)  => {
            bcrypt.hash(newApp.password,salt,(err,hash) => {
                if(err) throw err;
                newApp.password = hash;
                newApp.save()
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
                                        email: user.email
                                    }
                                });
                            }
                        )
                    });
            });
        })
    })
});


// @route   POST api/auth/applicant/login
// @desc    Auth user (Login)
// @access  Public -- Authentication !!!
router.post('/login', async (req,res) => {
    
    const {email, password } = req.body;

    console.log("in login")
 
    //Simple Validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields! '});
    }
    //Check for existing recruiter
    console.log("found")
    Applicant.findOne({ email })
     .then(user => {
         if(!user) return res.status(400).json({ msg: 'User Applicant does not exist.' });

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
