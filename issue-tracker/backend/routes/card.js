var express = require('express');
let cors = require('cors');
const routing = express();
let Card = require('./models/card');


const whiteList = ["http://localhost:4200"];

let corsOptions = {
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true);
        }
        else{
            callback (new Error('CORS Policy Error'));
        }
    }
}
routing.use(cors(corsOptions)) //set all cors options here. 
routing.use(express.json());

routing.post('/newCard', function(req, res){
    console.log(req.body['card'])
    Card.create(req.body['card'],(error, data)=>{
        if(error){
            console.log('error');
        }
        else{
            console.log(data);
        }
    })
    res.send("bleh");
});

module.exports = routing;