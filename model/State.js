const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
        userName: {type:String, requied: true}
});

module.exports = mongoose.model('State',StateSchema,'State');