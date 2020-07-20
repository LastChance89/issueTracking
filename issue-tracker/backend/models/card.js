const mongoose = require('mongoose')
const schema = mongoose.scheme;

let Card = mongoose.Schema({
    title: String, 
    type: String,
    status: String,
    priority: Number, 
    assignedUser: String, 
    summary:String,
    idNo: Number
}, {collection: 'Issues'});
module.exports = mongoose.model('Card',Card);