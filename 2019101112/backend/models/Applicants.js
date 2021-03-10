const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - change required false to true

//Create Schema
const ApplicantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    education: {
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
    skills: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        min:0,
        max:5,
        required: false
    },
    // if Accepted job id he is in, if unAccepted = job_id is 0
    job_id: {
        type: String,
        required: false,
        default: 0
    },
    job_title: {
        type: String,
        required: false,
    },
    job_type: {
        type: String,
        enum: ['F', 'P', 'H'],
        required: false
    },
    // Array of all the applications they ever submitted
    applications: {
        type: Array,
        required: false
    },
     // if Accepted then date of joining
    date_of_joining: {
        type: Date,
        required: false
    },
    // number of active applications
    num_applications: {

        type:Number,
        required:false,
        default:0
    }
    
});

module.exports = Applicant = mongoose.model('applicant',ApplicantSchema);


 