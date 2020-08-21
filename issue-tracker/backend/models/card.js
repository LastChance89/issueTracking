const mongoose = require('mongoose')

let Card = mongoose.Schema({
    title: String, 
    type: String,
    status: Number,
    priority: Number, 
    project: String,
    assignedUser: String, 
    summary:String,
    _id: String
}, {collection: 'Issues'});

module.exports = mongoose.model('Card',Card);