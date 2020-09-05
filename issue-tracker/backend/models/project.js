const mongoose = require('mongoose')
const Column = require('./column')
let Project = mongoose.Schema({
    projectTitle: String,
    columns: []

}, {collection: "Project_Meta"});

module.exports = mongoose.model('Project', Project);