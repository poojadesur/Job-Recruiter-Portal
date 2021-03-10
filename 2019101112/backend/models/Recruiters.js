const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - change required false to true

//Create Schema
const RecruiterSchema = new Schema({
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
    contact_number: {
        type: Number,
        required: false
    },
    bio: {
        type: String,
        max: 250,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    // take applications from job_listing
    job_listings: {
        type: Array,
        required: false
    },
    employees: {
        type: Array,
        required: false
    }

});

module.exports = Recruiter = mongoose.model('recruiter',RecruiterSchema);