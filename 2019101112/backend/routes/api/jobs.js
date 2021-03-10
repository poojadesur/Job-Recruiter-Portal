const express = require('express');
const router = express.Router();

// Models
const Applicant = require('../../models/Applicants');
const Recruiter = require('../../models/Recruiters');
const Application = require('../../models/Applications');
const Job = require('../../models/Jobs');


// @route GET api/jobs
// @desc  Get All Jobs
// @access Public
router.get('/', (req,res) => {
    Job.find()
        .then(jobs => 
        {
            res.json(jobs)
        })
});

// @route POST api/jobs
// @desc  Create A Job
// @access Public
router.post('/', (req,res) => {
    const newJob = new Job({
        job_title: req.body.job_title
    });

    newJob.save().then(job => res.json(job));
});

// @route DELETE api/jobs
// @desc  Delete A Job
// @access Public
router.delete('/:id', async (req,res) => {

    const job = await Job.findById(req.params.id);

    const application_ids = job.applications;

    for await (const appl of Application.find({_id: {$in: application_ids}})){

        await Application.findByIdAndUpdate(appl._id, {$set: {Rejected:true}},{$set: {Accepted:false}},{$set: {Shortlisted:false}},{$set: {Applied:false}},{$set: {status:"Rejected"}})

        const applicant = await Applicant.findByIdAndUpdate(appl.applicant_id , {$pull: {applications: appl._id} , $inc: {num_applications: -1}})

        if(applicant.job_id == req.params.id)
        {
            await Applicant.findByIdAndUpdate(appl.applicant_id , {$set: {job_id: ''}} , {$set: {job_title: ''}}, {$set: {job_type: ''}},{$set: {date_of_joining: ''}});
        }
    }

    // console.log("sucess")

    Job.findById(req.params.id)
    .then(job => job.remove().then(() => res.json({sucess: true})))
    .catch(err => res.status(404).json({success: false}));
});



module.exports = router;