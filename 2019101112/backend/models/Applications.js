const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - change required false to true

// Create Schema
const ApplicationSchema = new Schema({
    // job title = application title ?
    title: {
        type: String,
        required: false
    },
    // for which does this application belong
    job_id: {
        type: String,
        required: false
    },
    applicant_id: {
        type: String,
        required:false
    },
    apply_date: {
        type: Date,
        default: Date.now,
        required: false
    },
    recruiter_name: {
        type: String,
        required: false
    },
    salary: {
        type: Number,
        required: false
    },
    recruiter_rating: {
        type: Number,
        required: false
    },
    SOP: {
        type:String,
        required:false
    },
    // Rejected, Accepted, Shortlisted, Applied, Deleted is equivalent to a Rejected Application? 
    status: {
        type: String,
        required: false,
        default:"Applied"
    },
    Rejected: {
        type:Boolean,
        default:false
    },
    Accepted: {
        type:Boolean,
        default:false
    },
    Shortlisted: {
        type:Boolean,
        default:false
    },
    Applied: {
        type:Boolean,
        default:false
    },
    applicant_name: {
        type:String,
        required:true
    },
    applicant_education: {
        type: [
            {
                institution: {
                    type: String,
                    required: true
                },
                start_year: {
                    type: Number,
                    required: true
                },
                end_year: {
                    type: Number,
                    required: false
                }
            }
        ],
        required: false
    },
    applicant_skills: {
        type: Array,
        required: true
    },
    applicant_rating: {
        type: Number,
        min:0,
        max:5,
        required: false
    }

});

module.exports = Application = mongoose.model('application',ApplicationSchema);