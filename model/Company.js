const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    img: {type: String, required: false},
    title: {type: String, required: true},
    address: {type: String, required: true},
    logo: {type: String, required: true},
    overviews: {type: String, required: true},
    keySkills: {type: Array, required: true},
    whyYouLoveWorkingHere: {type: String, required: false},
    url: {type: String, required: true}
})

module.exports = mongoose.model('Company',CompanySchema);