const express = require('express');
const router = express.Router();

// Models
const Applicant = require('../../models/Applicants');
const Recruiter = require('../../models/Recruiters');
const Application = require('../../models/Applications');
const Job = require('../../models/Jobs');


const auth = require('../../middleware/auth');


// @route GET api/applicant
// @desc  Get All Applicants details (not actually required anywhere)
// @access Public
router.get('/', (req,res) => {
    Applicant.find()
        .then(app => res.json(app))
});

// @route DELETE api/applicant/:id
// @desc  Delete A Applicant
// @access Public
router.delete('/:id',auth,(req,res) => {
    Applicant.findById(req.params.id)
    .then(app => app.remove().then(() => app.json({sucess: true})))
    .catch(err => app.status(404).json({success: false}));
});

// @route   GET api/applicant/profile
// @desc    Get applicant profile details
// @access  Private
router.get('/profile/:id',(req, res) => {
    // console.log(req.params.id)
    Applicant.findById(req.params.id)
        .select('-password')
        .then(user => { res.json(user)});
});

// @route   GET api/applicant/updateprofile
// @desc    Update applicant profile details (change Applicant)
// @access  Private
router.post('/updateprofile/:id', async (req,res) => {

    const {updatedName, updatedEmail, updatedPassword, updatedEducation, updatedSkills } = req.body;
    // console.log(updatedEducation);

    updatedApplicant = await Applicant.findById(req.params.id)

    if(updatedName)
    {
        updatedApplicant.name = updatedName;
    }
    if(updatedEmail)
    {
        updatedApplicant.email = updatedEmail;
    }
    if(updatedEducation)
    {
        updatedApplicant.education = updatedApplicant.education.concat(updatedEducation);
    }
    if(updatedSkills)
    {
        updatedApplicant.skills.push(updatedSkills);
    }
    if(updatedPassword)
    {
        bcrypt.genSalt(10, (err, salt)  => {
            bcrypt.hash(updatedPassword,salt,(err,hash) => {
                if(err) throw err;
                updatedApplicant.password = hash; }) }) 
    }

    updatedApplicant.save().then(user => { res.json({user}); })

})


// doesnt work!!!
// @route   GET api/applicant/show_jobs
// @desc    Get all jobs where the deadline hasn't passed (pass deadline in json object)
// @access  Public

router.get('/show_jobs', async (req,res) =>
{   
    const current_date = new Date();
    // console.log(current_date)
    accesibleJobs = await Job.find({deadline_date: {$gt: current_date}});
    return res.json(accesibleJobs)

})


// @route   GET api/applicant/apply
// @desc    Apply for a Job by Applicant (Add Applications (get recruiter name,salary etc from Job using job_id), Inc Job num_applicants, add application id to Applicants applications and inc num_applications,)
// @access  Private
router.post('/apply/:id',async (req,res) => {

    const applicant_id = req.params.id;
    const { job_id, title, SOP} = req.body;
    requiredJob = await Job.findById(job_id); 
    
    // adding to Application
    const recruiter_name = requiredJob.recruiter_name;
    const salary = requiredJob.salary;
    const Applied = true;
    const status = "Applied";

    applicant = await Applicant.findById(applicant_id);
    const applicant_name = applicant.name;
    const applicant_skills = applicant.skills;
    const applicant_education = applicant.education;
    const applicant_rating = applicant.rating;

    const newApp = new Application({
        title,
        job_id,
        applicant_id,
        recruiter_name,
        salary,
        status,
        SOP,
        Applied,
        applicant_name,
        applicant_rating,
        applicant_skills,
        applicant_education
    });

    newApp.save().then(app => {res.json({app})});

    // increase num_applications in Job
    await Job.findByIdAndUpdate(job_id, {$inc: {num_applicants: +1}})

    const job = await Job.findById(job_id)
    const num_applicants = job.num_applicants;
    const max_applicants = job.max_applicants;
    // console.log(num_applicants)
    // console.log(max_applicants)

    if(num_applicants >= max_applicants)
    {
        await Job.findByIdAndUpdate(job_id, {$set: {full: true}})
    }

    const job2 = await Job.findById(job_id);
    // console.log(job2.full)

    // add applications id to applicant
    const application_id = newApp._id;
    await Applicant.findByIdAndUpdate(applicant_id, {$push: {applications: application_id}})
    await Applicant.findByIdAndUpdate(applicant_id, {$inc: {num_applications: +1}})

})

// @route   GET api/applicant/viewApp
// @desc    View applications applicant has applied to (Get from Applications ids in Applicant applications)
// @access  Private
router.get(`/viewApp/:id`,async (req,res) => {
    
    const applicant_id = req.params.id;

    applicant = await Applicant.findById(applicant_id)
    // console.log(applicant)
    applicationids = applicant.applications
    // console.log(applicationids)
    applications = await Application.find({'_id': { $in : applicationids }}).then(apps => res.json(apps))

})


module.exports = router;