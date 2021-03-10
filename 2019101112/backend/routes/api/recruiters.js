const express = require('express');
const router = express.Router();

// Models
const Applicant = require('../../models/Applicants');
const Recruiter = require('../../models/Recruiters');
const Application = require('../../models/Applications');
const Job = require('../../models/Jobs');

const auth = require('../../middleware/auth');

// @route GET api/recruiter
// @desc  Get All Recruiters details (not actually required anywhere)
// @access Public
router.get('/', (req,res) => {
    Recruiter.find()
        .then(app => res.json(app))
});

// @route DELETE api/recruiter
// @desc  Delete A Recruiter
// @access Public
router.delete('/:id',auth,(req,res) => {
    Recruiter.findById(req.params.id)
    .then(app => app.remove().then(() => app.json({sucess: true})))
    .catch(err => app.status(404).json({success: false}));
});

// @route   GET api/recruiter/profile
// @desc    Get recruiter profile details
// @access  Private
router.get('/profile/:id',(req, res) => {
    Recruiter.findById(req.params.id)
        .select('-password')
        .then(user => res.json(user));
});

// @route   POST api/recruiter/profile ?? ! NOT COMP
// @desc    Update recruiter profile details
// @access  Private
router.post('/updateprofile/:id',async (req,res) => {

    const {updatedName, updatedEmail, updatedPassword, updatedContact_number, updatedBio } = req.body;

    updatedRecruiter = await Recruiter.findById(req.params.id)

    if(updatedName)
    {
        updatedRecruiter.name = updatedName;
    }
    if(updatedEmail)
    {
        updatedRecruiter.email = updatedEmail;
    }
    if(updatedContact_number)
    {
        updatedRecruiter.contact_number = updatedContact_number;
    }
    if(updatedBio)
    {
        updatedRecruiter.bio = updatedBio;
    }
    if(updatedPassword)
    {
        bcrypt.genSalt(10, (err, salt)  => {
            bcrypt.hash(updatedPassword,salt,(err,hash) => {
                if(err) throw err;
                updatedRecruiter.password = hash; }) }) 
    }

    updatedRecruiter.save().then(user => { res.json({user}) })

})


// @route   POST api/recruiter/createjob
// @desc    Recruiter creates a job (add to Job,Recruiter job_listings)
// @access  Private
router.post('/createjob', async (req,res) => {
    
    // console.log(req.body.id)
    recruiter = await Recruiter.findById(req.body.id);
    // console.log(recruiter)
    const recruiter_id = recruiter._id;
    const recruiter_name = recruiter.name;
    // console.log(recruiter_name)
    const recruiter_email = recruiter.email;
    const {job_title, max_applicants, max_positions, deadline_date, required_skillset, job_type, duration, salary } = req.body
    const newJob = new Job({
        job_title,
        recruiter_name,
        recruiter_id,
        recruiter_email,
        max_applicants,
        max_positions,
        deadline_date,
        required_skillset,
        job_type,
        duration,
        salary
    });

    newJob.save().then(job => { res.json({job}) })

})

// possibly pass as a parameter - depends on frontend
// @route   POST api/recruiter/editjob
// @desc    Recruiter edits a job (add to Job,Recruiter job_listings)
// @access  Private
router.post('/editjob',async (req,res) => {

    const recruiter_id = req.body.id;
    const { job_id, max_applicants, max_positions, deadline_date } = req.body;

    updatedJob = await Job.findById(job_id);

    if(max_applicants)
    {
        updatedJob.max_applicants = max_applicants;
    }
    if(max_positions)
    {
        updatedJob.max_positions = max_positions;
    }
    if(deadline_date)
    {
        updatedJob.deadline_date = deadline_date;
    }

    updatedJob.save()
    .then(job => { 
        res.json({job}) 
    })

})

// NOT COMP!
// @route   DELETE api/recruiter/deletejob
// @desc    Recruiter deletes a job they have created (setting Job deleted to true, Recruiter job_listings, wb applications for that job??)
// @access  Private
router.post('/deletejob',auth,async (req,res) => {

    const recruiter_id = req.user.id

    const { job_id } = req.body

    jobApplication = await Application.find({job_id: job_id}).forEach()


    // not removing from jobs =


})


// @route   GET api/recruiter/jobs
// @desc    View all the jobs the recruiter has created
// @access  Private
router.get('/viewjobs/:id', async (req,res) => {

    // const recruiter_jobs = await Job.find({recruiter_id: req.params.id});

    // return (
    //     res.json({recruiter_jobs})
    // )

    Job.find({recruiter_id: req.params.id})
    .then(jobs => {
        res.json(jobs)})
})

// ! NOT COMP
// @route GET api/recruiter/:job_id
// @desc  GET applications for a job created by recruiter (get all Applications that match job_id)
// @access Public
router.get('/:job_id', async (req,res) => {
    
    const job_id = req.params.job_id

    await Application.find({job_id :job_id})
        .select('-applicant_education')
        .then(app => {
            if(app.status != "Rejected")
            {
                res.json(app)
            }
        })
});

// WAT DO I DO WITH OTHER APPLICATIONS FOR OTHER JOBS - NOT COMPLETED
// @route   POST api/recruiter/acceptApp
// @desc    Recruiter Accepts an Application ( update Recruiter employees, Applicant job_id, Job num_filled_positions, Application status)
// @access  Private
router.post('/acceptApp', async (req,res) => {
    
    const recruiter_id = req.body.recruiter_id;
    const job_id = req.body.job_id;
    const application_id = req.body.application_id;

    // updating application to accepted
    application = await Application.findByIdAndUpdate(application_id, {$set: {status: "Accepted"}});
    application = await Application.findByIdAndUpdate(application_id, {$set: {Shortlisted: false}});
    application = await Application.findByIdAndUpdate(application_id, {$set: {Accepted: true}});
    const applicant_id = application.applicant_id;

    const job= await Job.findById(job_id)
    const job_title = job.job_title;
    const job_type = job.job_type;
    var date = new Date();
    // console.log(date.toDateString())
    // var date2 = date.toDateString()

    // updating applicant to set a job Id and reduce number of Active applications
    await Applicant.findByIdAndUpdate(applicant_id, {$set: {job_id: job_id}});
    await Applicant.findByIdAndUpdate(applicant_id, {$set: {date_of_joining: date }});
    await Applicant.findByIdAndUpdate(applicant_id, {$set: {job_title: job_title}});
    await Applicant.findByIdAndUpdate(applicant_id, {$set: {job_type: job_type}});

    // console.log(Date.now().toDateString());
    
    // updating the recruiters employees
    await Recruiter.findByIdAndUpdate(recruiter_id, {$push: {employees: applicant_id}});

    return res.json({"success":"true"});
});

// @route   POST api/recruiter/shortlistApp
// @desc    Recruiter Shortlists an Application (update Application status)
// @access  Private , {$set: {Shortlisted: true}}, {$set: {Applied:false}}
router.post('/shortlistApp', async (req,res) => {
    
    const application_id = req.body.application_id;

    
    // updating application to shortlisted
    application = await Application.findByIdAndUpdate(application_id, {$set: {status: "Shortlisted"}});
    application = await Application.findByIdAndUpdate(application_id, {$set: {Shortlisted: true}});
    application = await Application.findByIdAndUpdate(application_id, {$set: {Applied:false}});

    return res.json({"success":"true"});

});

// @route   POST api/recruiter/deleteApp
// @desc    Recruiter Rejects an Application (update Application status, reduce Job num_applicants, )
// @access  Private
router.post('/rejectApp', async (req,res) => {
    

    const recruiter_id = req.body.recruiter_id;
    const job_id = req.body.job_id;
    const application_id = req.body.application_id;

    // updating application to rejected
    application = await Application.findByIdAndUpdate(application_id, {$set: {status: "Rejected"}})
    application = await Application.findByIdAndUpdate(application_id, {$set: {Shortlisted: false}})
    application = await Application.findByIdAndUpdate(application_id, {$set: {Applied: false}})
    application = await Application.findByIdAndUpdate(application_id, {$set: {Rejected: true}})
    const applicant_id = application.applicant_id

    // decreasing applicants number of active applications
    await Applicant.findByIdAndUpdate(applicant_id,{$inc : {num_applications : -1}})

    //  decreasing jobs number of applications
    await Job.findByIdAndUpdate(job_id, {$inc: {num_applicants: -1}})

    return res.json({"success":"true"});

});

// @route   POST api/recruiter/employees
// @desc    Recruiter's employees (update Application status, reduce Job num_applicants, )
// @access  Private
router.post('/employees', async (req,res) =>  {

    const recruiter_id = req.body.recruiter_id;

    const employees = await Recruiter.findById(recruiter_id).select("employees")

    return res.json(employees);
});



module.exports = router;
