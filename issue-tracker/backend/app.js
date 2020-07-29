const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
path = require('path'),
publicDir = path.join(__dirname,'public');
const routes = require('./routes/routing');
console.log(port);
app.listen(port);
app.use('/',routes);

//mongoose connection
const datbaseUrl = "mongodb://localhost:27017/IssueTracker";
mongoose.connect(datbaseUrl,{useNewUrlParser: true})
.then(() => console.log("Connection to MongoDB succsesfull"))
.catch((err) => console.log(err));

console.log('start');

module.exports = app;

