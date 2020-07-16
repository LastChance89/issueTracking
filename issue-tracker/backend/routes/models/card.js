const mongoose = require('mongoose')
const schema = mongoose.scheme;

let Card = new Schmea({
    type: String,
    title: String, 
    priority: Number, 
    assignedUser: String, 
    summary:String,
    idNo: Number
});