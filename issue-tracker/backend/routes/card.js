var express = require('express');
let cors = require('cors');
const routing = express();


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
    console.log('verify rtouer hit.')
    res.send("bleh");
});


routing.get('/', function(req, resp){
    resp.send("Testing");
})

module.exports = routing;