const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - change required false to true

//Create Schema
const JobSchema = new Schema({
    job_title: {
        type: String,
        required: false
    },
    recruiter_name: {
        type: String,
        required: false
    },
    recruiter_email: {
        type: String,
        required: false
    },
    recruiter_id:{
        type:String,
        required:true
    },
    max_applicants: {
        type: Number,
        required: false
    },
    max_positions: {
        type: Number,
        required: false
    },
    num_applicants: {
        type: Number,
        required: false,
        default:0
    },
    num_filled_positions: {
        type: Number,
        required: false,
        default:0
    },
    posting_date: {
        type: Date,
        default: Date.now,
        required: false
    },
    deadline_date: {
        type: Date,
        required: false
    },
    required_skillset: {
        type: Array,
        required: false,
        default: []
    },
    job_type: {
        type: String,
        enum: ['F', 'P', 'H'],
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    salary: {
        type: Number,
        required: false,
    },
    applications: {
        type:Array,
        required:false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    full: {
        type:Boolean,
        default:false
    }

});

module.exports = Job = mongoose.model('job',JobSchema);