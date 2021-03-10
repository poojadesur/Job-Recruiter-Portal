const express = require('express');
const router = express.Router();

// Models
const Applicant = require('../../models/Applicants');
const Recruiter = require('../../models/Recruiters');
const Application = require('../../models/Applications');
const Job = require('../../models/Jobs');


// @route GET api/application
// @desc  Get All Applications
// @access Public
router.get('/', (req,res) => {
    
    Application.find()
        .then(app => res.json(app))
});

// @route POST api/applications
// @desc  Create A Application
// @access Public
router.post('/', (req,res) => {
    const newApp = new Application({
        title: req.body.title
    });

    newApp.save().then(app => res.json(app));
});

// @route DELETE api/application
// @desc  Delete A Application
// @access Public
router.delete('/:id', (req,res) => {
    Application.findById(req.params.id)
    .then(app => app.remove().then(() => res.json({sucess: true})))
    .catch(err => res.status(404).json({success: false}));
});


module.exports = router;