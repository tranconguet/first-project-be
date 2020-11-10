const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String,required: true},
    type: {type: String,required: true},
    fullName: {type: String,required: true},
    sex: {type: String,required: true},
    dateOfBirth: {type: String,required: true},
    address: {type: String,required: false},
    phoneNumber: {type: String,required: false},
    email: {type: String,required: false},
    hobbies: {type: String,required: false},
    literacy: {type: String,required: false},
    gpa: {type: String,required: false},
    skills: {type: Array,required: false},
    experiences: {type: String,required: false},
})

module.exports = mongoose.model('User',CandidateSchema,'Users');