const mongoose = require('mongoose')
const Column = require('./column')
let Project = new mongoose.Schema({
    projectTitle: String,
    position: Number,
    columns: [],
    iqrTypes:[],
    priorities:[]
}, {collection: "Project_Meta"});

module.exports = mongoose.model('Project', Project);