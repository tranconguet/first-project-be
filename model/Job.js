const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
        title: {type: String, required: true},
        url: {type: String, required: true},
        employerInfo: {type: Object, required: true},
        tagList: {type: Array, required: true},
        address: {type: String, required: true},
        timePosted: {type: String, required: true},
        threeReasons: {type: Array, required: false},
        jobDescriptions: {type: Array, required: true},
        experiences: {type: Array, required: true},
        whyLoveWorkingHere: {type: Array, required: true}
})

module.exports = mongoose.model('Job',JobSchema,'Jobs');