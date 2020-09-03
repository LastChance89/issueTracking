const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
const Logger = require('./util/logging/loggerUtil');
const initalizer = require('./initalize');

path = require('path'),
publicDir = path.join(__dirname,'public');
const routes = require('./routes/routing');

let logger = new Logger();

console.log(port);
app.listen(port);
app.use('/',routes);

//mongoose connection
const datbaseUrl = "mongodb://localhost:27017/IssueTracker";
mongoose.connect(datbaseUrl,{useNewUrlParser: true})
.then(() => logger.info("Connection to MongoDB succsesfull on port" + port))
.catch((err) => logger.error(err));

initalizer.initalize();

logger.info("System Started successfully")

console.log('start');

module.exports = app;

