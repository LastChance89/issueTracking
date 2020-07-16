var express = require('express');
var port = process.env.PORT || 3000;
var app = express(),
path = require('path'),
publicDir = path.join(__dirname,'public');
const routes = require('./routes/card');
console.log(port);
app.listen(port);
app.use('/',routes);

console.log('start');

module.exports = app;

